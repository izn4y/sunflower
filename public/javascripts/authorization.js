"use strict";
const sendBtn = document.getElementById("look");
const div_content_form = document.getElementById("content-form");

sendBtn.addEventListener("click", async () => {
  const cname = document.getElementById("name").value;
  const service = document.getElementById("service").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cname,
      email: email,
      service: service,
      message: message,
    }),
  };

  try {
    const fetchResponse = await fetch(`/sendmail`, settings);
    if (fetchResponse.status != 200) {
      // si le statut est pas égale 200 on affiche une erreur
      document.getElementById("aled3").innerHTML = "une erreur est survenue";
      return;
    }

    await fetchResponse.json().then((result) => {
      if (result.formError) {
        // on regarde si les champs sont vides

        //TODO FAIRE LES REGLAGEs
        // $(".msg").html(result.formError[0].empty_fileds);
        // buildAlertMsg(result.formError[0].empty_fileds);
        $(".alert").addClass("show");
        $(".alert").removeClass("hide");
        $(".alert").addClass("showAlert");
        setTimeout(function () {
      
          // $('.alert').removeClass("show");
          // $('.alert').addClass("hide");
        }, 5000);

        $(".close-btn").click(function () {
          $(".alert").removeClass("show");
          $(".alert").addClass("hide");
        });
        // document.getElementById("aled3").innerHTML =
        //   result.formError[0].empty_fileds;
        return;
      }
      if (result.error) {
        // on regarde si il y'a une erreur du mailsender
        document.getElementById("aled3").innerHTML = result.error;
        return;
      }
      //si on est ici c'est que tout est bon on lance l'animation

      //Animation du loader

      document.getElementById("contact-form").remove();
      document.getElementById("rgpdinfo").remove();

      const loader = document.createElement("div");
      loader.innerHTML = `
        <div class="page_spinner text-left mr-auto">
        <div class="spinner">
            <div class="bounce2"></div>
            <div class="bounce1"></div>
            <div class="bounce3"></div>
            <div class="tick"></div>
        </div>
    </div>
          <p id="msg" class="text-center mt-3"></p>
          `;
      div_content_form.appendChild(loader);

      setTimeout(() => {
        $(".spinner").addClass("end");
        document.getElementById("msg").innerHTML = "Mail envoyé ";
      }, 1502);
      setTimeout(() => {}, 5000);
    });
  } catch (error) {
    document.getElementById("aled3").innerHTML = error;
    console.log(error);
  }
});

// const buildAlertMsg = (pMsg) => {
//   const div_alert = document.createElement("div");
//   div_alert.setAttribute("class", "alert");
//   div_alert.innerHTML = ` 
//   <span class="fas fa-exclamation-circle"></span>
//   <span class="msg">${pMsg}</span>
//   <div class="close-btn">
//   <span class="fas fa-times">x</span>
//   </div>
//   `;
//   div_content_form.appendChild(div_alert);
// };


