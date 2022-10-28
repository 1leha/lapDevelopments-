function authData(
  target,
  { id, authData: { name = '', email = '', phone = '' } }
) {
  const markup = `
          <li class="active-user__item">
            Id:
            <span class="active-user__value" data-firebaseValue="id">${id}</span>
          </li>

          <li class="active-user__item">
            Name:
            <span class="active-user__value" data-firebaseValue="name">${name}</span>
          </li>

          <li class="active-user__item">
            E-mail:
            <span class="active-user__value" data-firebaseValue="email">${email}</span>
          </li>

          <li class="active-user__item">
            Phone:
            <span class="active-user__value" data-firebaseValue="phone">${phone}</span>
          </li>
  `;

  target.innerHTML = markup;
}

function firebaseData(
  target,
  { id, dbData: { name = '', email = '', phone = '', story = '' } }
) {
  const markup = ` 
        <li class="active-user__item">
          Id:
          <span class="active-user__value" data-firebaseValue="id">${id}</span>
        </li>

        <li class="active-user__item">
          Name:
          <span class="active-user__value" data-firebaseValue="Name">${name}</span>
        </li>

        <li class="active-user__item">
          E-mail:
          <span class="active-user__value" data-firebaseValue="email">${email}</span>
        </li>

        <li class="active-user__item">
          Phone:
          <span class="active-user__value" data-firebaseValue="phone">${phone}</span>
        </li>

        <li class="active-user__item">
          Story:
          <span class="active-user__value" data-firebaseValue="story">${story}</span>
        </li>
      
    `;

  target.innerHTML = markup;
}

function localStorageData(
  target,
  id,
  { name = '', email = '', phone = '', story = '' }
) {
  const markup = ` 
        <li class="active-user__item">
          Id:
          <span class="active-user__value" data-firebaseValue="id">${id}</span>
        </li>

        <li class="active-user__item">
          Name:
          <span class="active-user__value" data-firebaseValue="Name">${name}</span>
        </li>

        <li class="active-user__item">
          E-mail:
          <span class="active-user__value" data-firebaseValue="email">${email}</span>
        </li>

        <li class="active-user__item">
          Phone:
          <span class="active-user__value" data-firebaseValue="phone">${phone}</span>
        </li>

        <li class="active-user__item">
          Story:
          <span class="active-user__value" data-firebaseValue="story">${story}</span>
        </li>
      
    `;

  target.innerHTML = markup;
}

function loginedAs(ref, fieldText) {
  ref.innerHTML = fieldText;
}

function loginedUserInterface(refs, isUserLoginedIn) {
  // console.log('isUserLoginedIn :>> ', isUserLoginedIn);
  if (isUserLoginedIn) {
    refs.loginInputsBox.classList.add('hidden');
    refs.signUpButton.classList.add('hidden');
    refs.signInButton.classList.add('hidden');
    refs.loginedUserBox.classList.remove('hidden');
    refs.signOutButton.classList.remove('hidden');
  } else {
    refs.loginInputsBox.classList.remove('hidden');
    refs.signUpButton.classList.remove('hidden');
    refs.signInButton.classList.remove('hidden');
    refs.loginedUserBox.classList.add('hidden');
    refs.signOutButton.classList.add('hidden');
  }
}

function dataToForm(refs, { name = '', email = '', phone = '', story = '' }) {
  refs.dataForm.userName.value = name;
  refs.dataForm.email.value = email;
  refs.dataForm.phone.value = phone;
  refs.dataForm.userStory.value = story;
}

export default {
  loginedAs,
  localStorageData,
  firebaseData,
  authData,
  loginedUserInterface,
  dataToForm,
};
