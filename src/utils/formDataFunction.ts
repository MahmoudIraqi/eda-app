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


export const convertToSpecialObject = (WhichForm, typeOfMarketing, typeOfRegistration, isExport, trackType, id, event) => {
  return {
    isDraft: WhichForm === 'save' ? 1 : 0,
    typeOfMarketing,
    typeOfRegistration,
    isExport,
    trackType,
    id,
    ...event
  };
};
