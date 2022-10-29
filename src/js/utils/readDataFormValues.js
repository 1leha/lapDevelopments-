// Function making obj from data fields of DataForm
export default function readDataFormValues(ref) {
  const { userName, email, phone, userStory } = ref.elements;
  return {
    name: userName.value,
    email: email.value,
    phone: phone.value,
    story: userStory.value,
  };
}
