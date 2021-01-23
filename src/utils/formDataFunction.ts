import {FormGroup} from '@angular/forms';

export const formDataClass = (req?: any, FormParam?: FormGroup) => {
  let formData = new FormData();
  let arrayOfKeys;
  if (req) {
    arrayOfKeys = Object.keys(req);

    for (let i = 0; i < arrayOfKeys.length; i++) {
      formData.append(arrayOfKeys[i], FormParam.get(arrayOfKeys[i]).value);
    }

    return formData;
  }
};
