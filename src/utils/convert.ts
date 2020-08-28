class Convert {
  objectToFormData(object: { [key: string]: any }): FormData {
    const formData = new FormData();

    Object.keys(object).forEach(key => {
      formData.append(key, object[key]);
    });

    return formData;
  }
}

export const convert = new Convert();
