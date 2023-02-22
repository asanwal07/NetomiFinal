const formValidators = {
  validators: [
    {
      field: "name",
      validator: [
        {
          required: true,
          message: `Result: {"Name" : {"error" : "Name is a mandatory field"}}`
        },
        {
          minLength: 4,
          maxLength: 10,
          message: `Result: {"Name" : {"error" : "length Should be between 4 and 10"}}`
        }
      ]
    },
    {
      field: "email",
      validator: [
        {
          required: true,
          message: `Result: {"Email" : {"error" : "Email is mandatory"}}`
        },
        {
          pattern: /^\S+@\S+\.\S+$/,
          message: `Result: {"Email" : {"error" : "Please Enter an valid Email"}}`
        }
      ]
    },
    {
      field: "contact",
      validator: [
        {
          required: true,
          message: `Result: {"Contact" : {"error" : "Contact number is a mandatory field"}}`
        },
        {
          pattern: /^\d{10}$/,
          message: `Result: {"Contact" : {"error" : "Please Enter an valid Contact number "}}`
        }
      ]
    },
    {
      field: "country",
      validator: [
        {
          required: true,
          message: `Result: {"Country" : {"error" : "Country is a mandatory field"}}`
        }
      ]
    },
    {
      field: "state",
      validator: [
        {
          required: true,
          message: `Result: {"state" : {"error" : "state is a mandatory field"}}`
        }
      ]
    }
  ]
};


// Attach an event listener to the submit button of the form
const form = document.getElementById('myForm');
const submitBtn = document.getElementById("submit");
// Add a click event listener to the submit button
submitBtn.addEventListener('click', () => {
  // Loop through the form validators
  let message = '';
  for (let i = 0; i < formValidators.validators.length; i++) {
    const validator = formValidators.validators[i];
    const field = validator.field;
    const input = form[field];
    const value = input.value;
    const errorMessages = [];

    // Loop through the validator rules for the field
    for (let j = 0; j < validator.validator.length; j++) {
      const rule = validator.validator[j];

      // Check if the field is required and is empty
      if (rule.required && value.trim() === '') {
        errorMessages.push(rule.message);
      }

      // Check if the field has a minimum length
      if (rule.minLength && value.length < rule.minLength) {
        errorMessages.push(rule.message);
      }

      // Check if the field has a maximum length
      if (rule.maxLength && value.length > rule.maxLength) {
        errorMessages.push(rule.message);
      }

      // Check if the field has a specific pattern
      if (rule.pattern && !rule.pattern.test(value)) {
        errorMessages.push(rule.message);
      }

      if (errorMessages.length > 0) {
        break;
      }

    }
    // Prevent the form from submitting if there are any errors
    if (errorMessages.length > 0) {
      message = errorMessages[0];
      break;
    }

  }
  if (message == '') {
    message = 'Result: {"Success" : "All fields are valid." }'
  }
  var data = {
    origin: 'form',
    message: message
  }
  window.parent.postMessage(data, '*'); // send the message to the parent window
});


