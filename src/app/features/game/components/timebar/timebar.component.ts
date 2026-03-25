import {
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  output,
  Signal,
  signal,
} from '@angular/core';
import { TimebarColor } from '../../types/timerbar-color.type';

@Component({
  selector: 'app-timebar',
  imports: [],
  templateUrl: './timebar.component.html',
  styleUrl: './timebar.component.css',
})
export class TimebarComponent implements OnDestroy {
  initialTime = input.required<number>();
  finished = output<void>();

  private intervalId: number = 0;

  readonly time = signal<number>(0);
  readonly percent: Signal<number> = computed(() =>
    this.initialTime() > 0 ? (this.time() / this.initialTime()) * 100 : 0,
  );

  readonly width: Signal<string> = computed(() => {
    return `${this.percent()}%`;
  });

  readonly color: Signal<string> = computed<TimebarColor>(() => {
    const p = this.percent();
    if (p < 33) return 'red';
    if (p < 66) return 'coral';
    return 'seagreen';
  });

  constructor() {
    effect(() => {
      if (this.initialTime() > 0) this.resetTimer();
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private resetTimer(): void {
    clearInterval(this.intervalId);

    this.time.set(this.initialTime());
    this.startTimer();
  }

  private startTimer(): void {
    this.intervalId = setInterval(() => {
      this.time.update((t) => {
        if (t <= 0) {
          this.finished.emit();
          clearInterval(this.intervalId);
          return 0;
        }

        return t - 1;
      });
    }, 1000);
  }
}
