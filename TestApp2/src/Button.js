export function Button() {
    //Create an input type dynamically.   
    const element = document.createElement('div');
    //Assign different attributes to the element. 
    const button = document.createElement('button');
    button.innerHTML = 'Submit';
    element.appendChild(button);
    document.body.appendChild(element);
    return element;
  }

  //document.body.appendChild(Button());