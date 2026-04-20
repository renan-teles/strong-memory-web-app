import { FormControl } from '@angular/forms';

export type WordSuggestionsForm = {
  suggestedWord: FormControl<string>;
  suggestedDifficulty: FormControl<string>;
};
