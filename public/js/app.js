// Random Cat Photo
const catImg = document.querySelector('#catImg');
const button = document.querySelector('#clickme');

const loadRandomCatPhoto = async () => {
  try {
    const res = await axios.get("https://api.thecatapi.com/v1/images/search?");
    return res.data[0].url;
  } catch(e) {
    console.log("ERROR!!", e);
  }
}
const addRandomCatPhoto = async () => {
  const imgUrl = await loadRandomCatPhoto();
  catImg.src = imgUrl;
}

button.addEventListener('click', addRandomCatPhoto);

// fetch("https://api.thecatapi.com/v1/images/search?")
// .then(res  => {
//   console.log("RESOLVED!", res);
//   return res.json()
// })
// .then((data) => {
//   console.log(data);
// })
// .catch(e => {
//   console.log("ERROR!", e);
// })

// const loadRandomCatPhoto = async () => {
//   try {
//   const res = await fetch("https://api.thecatapi.com/v1/images/search?");
//   const data = await res.json();
//   console.log(data[0].url);
//   } catch(e) {
//     console.log("ERROR!!!", e);
//   }
// }

const contactForm = document.getElementById('contact-form');
const contactFormEvent = contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let mail = new FormData(contactForm);
  sendMail(mail);
})

const sendMail = (mail) => {
  fetch("/send", {
    method: "post",
    body: mail,
  }).then((res) => {
    return res.json();
  })
}