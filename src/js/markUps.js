export function renderAuthDataMarkup(
  target,
  { id = '', name = '', email = '', phone = '' }
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

export function renderFirebaseDataMarkup(
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

export function renderLocalStorageDataMarkup(
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
