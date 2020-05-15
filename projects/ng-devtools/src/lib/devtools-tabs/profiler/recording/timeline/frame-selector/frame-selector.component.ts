import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { GraphNode } from '../record-formatter/record-formatter';
import { Observable, Subscription } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TabUpdate } from '../../../../tab-update';

const ITEM_WIDTH = 29;

@Component({
  selector: 'ng-frame-selector',
  templateUrl: './frame-selector.component.html',
  styleUrls: ['./frame-selector.component.scss'],
})
export class FrameSelectorComponent implements OnInit, OnDestroy {
  @ViewChild('barContainer') barContainer: ElementRef;
  @Input() set currentFrame(value: number) {
    this.currentFrameIndex = value;
    this._ensureVisible(value);
  }
  @Input() set graphData$(graphData: Observable<GraphNode[]>) {
    this._graphData$ = graphData;
    this._graphDataSubscription = this._graphData$.subscribe((items) =>
      setTimeout(() => {
        this.viewport.scrollToIndex(items.length);
      })
    );
  }

  get graphData$(): Observable<GraphNode[]> {
    return this._graphData$;
  }

  @Output() move = new EventEmitter<number>();
  @Output() selectFrame = new EventEmitter<number>();
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

  currentFrameIndex: number;

  get itemWidth(): number {
    return ITEM_WIDTH;
  }

  private _graphData$: Observable<GraphNode[]>;
  private _graphDataSubscription: Subscription;
  private _tabUpdateSubscription: Subscription;

  constructor(private _tabUpdate: TabUpdate) {}

  ngOnInit(): void {
    this._tabUpdateSubscription = this._tabUpdate.tabUpdate$.subscribe(() => {
      if (this.viewport) {
        setTimeout(() => {
          this.viewport.scrollToIndex(0);
          this.viewport.checkViewportSize();
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this._tabUpdateSubscription) {
      this._tabUpdateSubscription.unsubscribe();
    }
    if (this._graphDataSubscription) {
      this._graphDataSubscription.unsubscribe();
    }
  }

  private _ensureVisible(index: number): void {
    if (!this.viewport) {
      return;
    }
    const scrollParent = this.viewport.elementRef.nativeElement;
    // The left most point we see an element
    const left = scrollParent.scrollLeft;
    // That's the right most point we currently see an element.
    const right = left + scrollParent.offsetWidth;
    const itemLeft = index * this.itemWidth;
    if (itemLeft < left) {
      scrollParent.scrollTo({ left: itemLeft });
    } else if (right < itemLeft + this.itemWidth) {
      scrollParent.scrollTo({ left: itemLeft - scrollParent.offsetWidth + this.itemWidth });
    }
  }
}