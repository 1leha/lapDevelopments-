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

function changedUserLoginInterface(refs) {
  refs.loginInputsBox.classList.toggle('hidden');
  refs.loginedUserBox.classList.toggle('hidden');
  refs.signUpButton.classList.toggle('hidden');
  refs.signInButton.classList.toggle('hidden');
  refs.signOutButton.classList.toggle('hidden');
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
  changedUserLoginInterface,
  dataToForm,
};
