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

// Contact Form
const contactForm = document.getElementById('contact-form');
const formEvent = contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let subject = document.getElementById('subject');
  let message = document.getElementById('message');
  sendEmail(name, email, subject, message)
})

function sendEmail(name, email, subject, message) {
  const options = {
    method: "POST",
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: name,
    email: email,
    subject:subject,
    message: message
  })
  };
return fetch("/contact", options)
  .then(res =>{
    if(res.status === 200){
      Swal.fire({
      icon: 'success',
      title: 'Your message has been sent Successfully!',
      })
      form.reset()
    }else{
      Swal.fire({
      icon: 'error',
      title: 'Error, please try agian!',
      })
      }
    })
}

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
