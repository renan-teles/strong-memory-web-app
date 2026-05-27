import { FormControl } from '@angular/forms';

export interface MatchDifficultyDataForm {
  difficulty: FormControl<string>;
  isInfiniteMode: FormControl<boolean>;
}
