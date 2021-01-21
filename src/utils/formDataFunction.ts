import {FormGroup} from '@angular/forms';

export const formDataClass = (req?: any, FormParam?: FormGroup) => {
  let formData = new FormData();
  let arrayOfKeys;
  if (req) {
    arrayOfKeys = Object.keys(req);
    console.log('arrayOfKeys', arrayOfKeys);

    for (let i = 0; i < arrayOfKeys.length; i++) {
      console.log(`${arrayOfKeys[i]}`, FormParam.get(arrayOfKeys[i]).value);
      formData.append(arrayOfKeys[i], FormParam.get(arrayOfKeys[i]).value);
    }

    return formData;
  }
};
