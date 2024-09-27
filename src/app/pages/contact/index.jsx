import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

export function Contact() {
  return (
    <section className="px-8 my-20 lg:py-16">
      <div className="container mx-auto text-center">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 !text-base lg:!text-2xl !text-yellow-900"
        >
          Contact Mairie
        </Typography>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:!text-5xl !text-yellow-900"
        >
         Une question, besoin d'une information ? 
        </Typography>
        <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-yellow-900">
        Vous pouvez nous poser votre question ou nous contacter pour votre demande dans le formulaire ci-dessous.
        Notre équipe vous répondra dans les plus bref délais.
        </Typography>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
        <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2619.842963720527!2d2.684933715984186!3d49.04692827930457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e8cd07de8eec3b%3A0x6a2f1ed84c3b4b8!2s8%20Rue%20Pierre%20Loyer%2C%2077230%20Juilly%2C%20France!5e0!3m2!1sen!2sfr!4v1695720137654!5m2!1sen!2sfr"
    width="600"
    height="450"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="w-full h-full lg:max-h-[510px]"
  ></iframe>
          <form
            action="#"
            className="flex flex-col gap-4 lg:max-w-sm"
          >
            <Typography
              variant="small"
              className="text-left !font-semibold !text-yellow-900"
            >
              Select Options for Business Engagement
            </Typography>
            <div className="flex gap-4">
              <Button variant="outlined" className="max-w-fit !text-yellow-900">
                Question d'ordre Générale
              </Button>
              <Button variant="outlined" className="max-w-fit !text-yellow-900">
                Question sur un évènement
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-yellow-900"
                >
                  Prénom
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="First Name"
                  name="first-name"
                  className="focus:border-t-gray-900"
                  containerProps={{
                    className: "min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-yellow-900"
                >
                  Nom
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="Last Name"
                  name="last-name"
                  className="focus:border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-yellow-900"
              >
                Votre email
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="name@email.com"
                name="email"
                className="focus:border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-yellow-900"
              >
                Votre Message
              </Typography>
              <Textarea
                rows={6}
                color="gray"
                placeholder="Message"
                name="message"
                className="focus:border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <Button className="w-full bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 ">
              Envoyer
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;