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
    isDraft: WhichForm === 'save' || WhichForm === 'submitProductForKit' ? 1 : 0,
    typeOfMarketing,
    typeOfRegistration,
    isExport: isExport ? 1 : 0,
    trackType,
    ...event,
    id,
    isCompleted: WhichForm === 'submitProductForKit' && typeOfMarketing === 5 ? true : false
  };
};

export const convertToSpecialObjectForLegacy = (WhichForm, event) => {
  console.log('WhichForm', WhichForm);
  console.log('event', event);
  return {
    ...event,
    isDraft: WhichForm === 'save' ? 1 : 0
  };
};

export const convertToSpecialObjectForReNotification = (WhichForm, typeOfMarketing, typeOfRegistration, isExport, trackType, id, notificationNumber, event) => {
  return {
    isDraft: WhichForm === 'save' || WhichForm === 'submitProductForKit' ? 1 : 0,
    typeOfMarketing,
    typeOfRegistration,
    isExport: isExport ? 1 : 0,
    trackType,
    ...event,
    id,
    notificationNumber,
    isCompleted: WhichForm === 'submitProductForKit' && typeOfMarketing === 5 ? true : false
  };
};
