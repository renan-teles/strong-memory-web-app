import { FormControl } from '@angular/forms';

export type WordForm = {
  word: FormControl<string>;
  difficulty: FormControl<string>;
};
