Contact Form Data Transporter

This project offers a ready-to-use solution that allows static websites to send contact form submissions directly to an email address using a hosted backend service. This is ideal for site owners who do not want to handle backend code but need to manage incoming form data via email efficiently.

Features:

No Backend Setup Required: The backend is pre-deployed; you just need to integrate the frontend code.
Customizable Email Parameters: Easily configure sender and receiver details.
Fully Managed Service: The server and its configurations are maintained, ensuring the service is always available.
How It Works
The service works by receiving data submitted from your web form, which is then emailed to your specified address using Nodemailer. All you need to do is embed the provided HTML and JavaScript into your site and configure a few settings.

Integration Guide:

Step 1: Add HTML
Copy the following HTML code into the body of your webpage where you want the contact form to appear: 

<form id="contactForm">
  <input type="text" id="name" name="name" placeholder="Your Name" required />
  <input type="email" id="email" name="email" placeholder="Email" required />
  <textarea id="message" name="message" placeholder="Message" required></textarea>
  <button type="submit" id="submit_btn" class="submit_btn">
    <img class="massage_submit_btn_img" src="./images/9.email_icon_100.png" alt="" />
    <span class="massage_submit_btn_text">Send Message</span>
  </button>
</form>

Step 2: Add JavaScript
Include the following JavaScript script in your webpage to handle the form submission:

const contactForm = document.getElementById("contactForm");
const massage_submit_btn_text = document.querySelector(".massage_submit_btn_text");
const massage_submit_btn_img = document.querySelector(".massage_submit_btn_img");

function resetSubmitButton() {
  massage_submit_btn_text.innerText = "Send Message";
  massage_submit_btn_img.src = "./images/9.email_icon_100.png";
}

Array.from(contactForm.elements).forEach(element => {
  element.addEventListener("input", resetSubmitButton);
});

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  if (contactForm.checkValidity()) {
    submitForm();
  } else {
    contactForm.reportValidity();
  }
});

async function submitForm() {
  massage_submit_btn_text.innerHTML = "Sending Message";
  massage_submit_btn_img.src = "./images/16.sending_message.gif";
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // === Nodemailer Values
  const mail_from = "---"; // Add the sender's address
  const mail_to = "---"; // Add the receiver's address
  const mail_subject = "New Form Submission"; // Customize the email subject
  
  try {
    const response = await fetch("YOUR_BACKEND_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
        name,
        email,
        message,
        mail_from,
        mail_to,
        mail_subject,
      }),
    });

    if (response.ok) {
      massage_submit_btn_text.innerHTML = "Message Delivered";
      massage_submit_btn_img.src = "./images/17.message_received.png";
      // alert("Form submitted successfully");
      contactForm.reset();
    } else {
      massage_submit_btn_text.innerHTML = "Error Occurred!";
      massage_submit_btn_img.src = "./images/18.message_error.png";
      // alert("Error submitting form");
    }
  } catch (error) {
    console.error("Error:", error);
    massage_submit_btn_text.innerHTML = "Error Occurred!";
    massage_submit_btn_img.src = "./images/18.message_error.png";
    // console.error("Error:", error);
    // alert("Error submitting form");
    contactForm.reset();
  }
});


Step 3: Configure Nodemailer Values
Modify the following Nodemailer values in your JavaScript as per your requirement:

const mail_from = "---"; // Add the sender's address
const mail_to = "---"; // Add the receiver's address
const mail_subject = "New Form Submission"; // Customize the email subject


Support:

For any issues or support, please file an issue through GitHub, and we will assist you in resolving it.

License:

This project is licensed under the MIT License.


