import { Component, HostListener, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import {
  MessageBus,
  Events,
  DevToolsNode,
  DirectivesProperties,
  ComponentExplorerViewQuery,
  ComponentExplorerView,
  ComponentExplorerViewProperties,
  ElementPosition,
  Descriptor,
} from 'protocol';
import { IndexedNode } from './directive-forest/index-forest';
import { ApplicationOperations } from '../../application-operations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertyTabComponent } from './property-tab/property-tab.component';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { PropertyViewComponent } from './property-tab/property-tab-body/property-view/property-view.component';

@Component({
  selector: 'ng-directive-explorer',
  templateUrl: './directive-explorer.component.html',
  styleUrls: ['./directive-explorer.component.css'],
})
export class DirectiveExplorerComponent implements OnInit {
  @Input() messageBus: MessageBus<Events>;

  @ViewChild(PropertyTabComponent) propertyTab: PropertyTabComponent;

  // The original data we pass to the property viewer.
  // Later, the property viewer may request more nested properties
  // from the backend.
  directivesData: DirectivesProperties | null = null;
  currentSelectedElement: IndexedNode = null;
  forest: DevToolsNode[];
  highlightIDinTreeFromElement: ElementPosition | null = null;

  splitDirection = 'horizontal';

  private changeSize = new Subject<Event>();

  constructor(private _appOperations: ApplicationOperations, private _snackBar: MatSnackBar) {
    this.changeSize
      .asObservable()
      .pipe(throttleTime(100))
      .subscribe(event => this.handleResize(event));
  }

  ngOnInit(): void {
    this.subscribeToBackendEvents();
  }

  handleNodeSelection(node: IndexedNode): void {
    this.currentSelectedElement = node;
    if (this.currentSelectedElement) {
      this.messageBus.emit('getElementDirectivesProperties', [node.position]);
      this.messageBus.emit('setSelectedComponent', [node.position]);
    }
  }

  subscribeToBackendEvents(): void {
    this.messageBus.on('elementDirectivesProperties', (data: DirectivesProperties) => {
      this.directivesData = data;
    });

    this.messageBus.on('latestComponentExplorerView', (view: ComponentExplorerView) => {
      this.forest = view.forest;
      this.directivesData = view.properties;
    });

    this.messageBus.on('highlightComponentInTreeFromElement', (position: ElementPosition) => {
      this.highlightIDinTreeFromElement = position;
    });
    this.messageBus.on('removeHighlightFromComponentTree', () => {
      this.highlightIDinTreeFromElement = null;
    });

    // Only one refresh per 50ms.
    let buffering = false;
    this.messageBus.on('componentTreeDirty', () => {
      if (buffering) {
        return;
      }
      buffering = true;
      setTimeout(() => {
        buffering = false;
        this.refresh();
      }, 50);
    });
    this.refresh();
  }

  refresh(): void {
    this.messageBus.emit('getLatestComponentExplorerView', [this._constructViewQuery()]);
  }

  viewSource(): void {
    this._appOperations.viewSource(this.currentSelectedElement.position);
  }

  handleSelectDomElement(node: IndexedNode): void {
    this._appOperations.selectDomElement(node.position);
  }

  private _constructViewQuery(): ComponentExplorerViewQuery {
    if (!this.currentSelectedElement) {
      return { selectedElement: null, expandedProperties: null };
    }
    return {
      selectedElement: this.currentSelectedElement.position,
      // We get the latest query for the properties.
      // The directive may have extended the properties
      // with nested ones which were dynamically requested
      // during the lifecycle of the app.
      expandedProperties: this._latestDirectiveData(),
    };
  }

  private _latestDirectiveData(): ComponentExplorerViewProperties {
    const result = {};
    this.propertyViews.toArray().forEach(view => {
      result[view.name] = view.getExpandedProperties();
    });
    return result;
  }

  get propertyViews(): QueryList<PropertyViewComponent> {
    return this.propertyTab.propertyTabBody.propertyViews;
  }

  copyPropData(propData: { [name: string]: Descriptor }): void {
    const handler = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', JSON.stringify(cleanPropDataForCopying(propData)));
      e.preventDefault();
      document.removeEventListener('copy', handler);
      this._snackBar.open('Copied to clipboard!', '', {
        duration: 1000,
      });
    };
    document.addEventListener('copy', handler);
    document.execCommand('copy');
  }

  handleHighlightFromComponent(position: ElementPosition): void {
    this.messageBus.emit('highlightElementFromComponentTree', [position]);
  }

  handleUnhighlightFromComponent(_: ElementPosition | null): void {
    this.messageBus.emit('removeHighlightFromElement');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.changeSize.next(event);
  }

  handleResize(event: Event): void {
    if ((event.target as any).innerWidth <= 500) {
      this.splitDirection = 'vertical';
    } else {
      this.splitDirection = 'horizontal';
    }
  }
}

const cleanPropDataForCopying = (propData: { [name: string]: Descriptor }, cleanedPropData = {}): object => {
  Object.keys(propData).forEach(key => {
    if (typeof propData[key].value === 'object') {
      cleanedPropData[key] = {};
      cleanPropDataForCopying(propData[key].value, cleanedPropData[key]);
    } else {
      cleanedPropData[key] = propData[key].value || propData[key].preview;
    }
  });
  return cleanedPropData;
};
