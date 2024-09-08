import { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, List, ListItem } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
export default function Footer() {
  const [emailSubmitted, setEmailSubmitted] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const inputData = new FormData(event.target);

    const email = inputData.get("email");

    try {
      const formData = new FormData();

      formData.append("entry.901377347", email);

      await fetch("https://docs.google.com/forms/d/12ux9Hg-JLYlFqGTC8cUsykAcP0ZhYNgNlhNXJd6SN6A", {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setEmailSubmitted(true);
    } catch (error) {
      console.log("An error occurred during form submission:", error);
      // Handle error
    }

    event.target.reset();
  };

  const socialMediaDetail = [
    {
      href: "https://www.facebook.com/",
      icon: <FacebookIcon />,
      name: "Facebook",
    },
    {
      href: "https://twitter.com/",
      icon: <XIcon />,
      name: "Twitter",
    },
    {
      href: "https://www.linkedin.com/",
      icon: <LinkedInIcon />,
      name: "LinkedIn",
    },
    {
      href: "https://www.instagram.com//",
      icon: <InstagramIcon />,
      name: "Instagram",
    },
    {
      href: "https://www.youtube.com/",
      icon: <YouTubeIcon />,
      name: "YouTube",
    },
  ];
  const currentYear = moment().format("YYYY");
  return (
    <div className=" mt-16 ">
      <div className="max-w-8xl mx-auto px-4 md:px-6 sm:px-6">
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12">
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="mb-4">
              <a
                href="/"
                className="flex gap-3 order-first font-medium text-white-900 lg:order-none lg:w-auto title-font"
              >
               
                <span className="text-xl font-black leading-none text-black select-none logo mt-3">Quiz App</span>
              </a>
            </div>
            <div className="text-sm text-[#71717A] secondary_text editable" data-content="website-subheadlines">
              Stay up to date on the latest features and releases by joining oue newsletter.
            </div>

            <div className="flex w-full items-center justify-between p-0 mb-4 rounded border border-2xl mt-6">
              {emailSubmitted ? (
                <div className="text-[#71717A] hover:text-gray-400 p-2 text-sm">
                  Thank you for contacting us. We will be in touch!
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex w-full items-center justify-between p-2">
                    <input
                      id="newsletter"
                      placeholder="Your email"
                      type="email"
                      required
                      className="border-none text-base text-heading text-[#71717A] w-full focus:outline-none focus:ring-0"
                    />

                    <Button
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "gray",
                        },
                        width: "150px",
                        marginX: 2,
                      }}
                      type="submit"
                      variant="contained"
                      className="normal-case"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"
                      ></path>
                      Subscribe
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <div className="text-sm text-[#71717A] secondary_text editable" data-content="website-subheadlines">
              By subscribing, you agree to our Policy and consent to receive emails updates from our company.
            </div>
          </div>

          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-black font-bold mb-4 primary_text editable">About Us</h6>
            <ul className="text-sm px-4 ">
              <li className="mb-4">
                <a
                  className="text-[#71717A] hover:text-gray-400 transition duration-150 ease-in-out secondary_text link-editable"
                  href="/upload"
                >
                  Admin Panel
                </a>
              </li>
              <li className="mb-4">
                <a
                  className="text-[#71717A] hover:text-gray-400 transition duration-150 ease-in-out secondary_text link-editable"
                  href="/"
                >
                  Quiz Creation
                </a>
              </li>
              <li className="mb-4">
                <a
                  className="text-[#71717A] hover:text-gray-400 transition duration-150 ease-in-out secondary_text link-editable"
                  href="/"
                >
                  User Interface
                </a>
              </li>
              <li className="mb-4">
                <a
                  className="text-[#71717A] hover:text-gray-400 transition duration-150 ease-in-out secondary_text link-editable"
                  href="/"
                >
                  Taking a Quiz
                </a>
              </li>
              <li className="mb-4">
                <a
                  className="text-[#71717A] hover:text-gray-400 transition duration-150 ease-in-out secondary_text link-editable"
                  href="/"
                >
                  Quiz Reporting
                </a>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className="text-black font-bold primary_text editable">Contact Us</h6>

            <List>
              <ListItem className="flex gap-2 justify-start">
                <div className="flex justify-start gap-1 text-black mt-1">
                  <LocationOnIcon />

                  <span className="text-[#71717A] hover:text-gray-400 text-sm">Address:</span>
                </div>
                <span className="text-[#71717A] hover:text-gray-400 text-sm">India</span>
              </ListItem>

              <ListItem className="flex gap-2">
                <div className="flex align-items-center gap-1 text-black mt-1">
                  <EmailIcon />

                  <span className="text-[#71717A] hover:text-gray-400 text-sm">Email:</span>
                </div>
                <span className="text-[#71717A] hover:text-gray-400 text-sm">support@quiz.com</span>
              </ListItem>

              <ListItem className="flex gap-2">
                <div className="flex align-items-center gap-1 text-black mt-1">
                  <PhoneInTalkIcon />

                  <span className="text-[#71717A] hover:text-gray-400 text-sm">Phone:</span>
                </div>
                <span className="text-[#71717A] hover:text-gray-400 text-sm">+91 123-456-7893</span>
              </ListItem>
            </List>
          </div>
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-black font-bold mb-2 primary_text editable ">Follow US</h6>
            <ul className="text-sm px-4">
              <li className="mb-2">
                <a
                  className="text-[#71717A] hover:text-gray-400 transition duration-150 ease-in-out secondary_text link-editable"
                  href="/"
                >
                  Join us on
                </a>
              </li>
              <div className="flex flex-col gap-2 mt-4">
                {socialMediaDetail.map((account) => (
                  <li className="mb-2" key={account.href}>
                    <a
                      className="text-[#71717A] hover:text-gray-400 transition duration-150 ease-in-out secondary_text link-editable"
                      href={account.href}
                    >
                      {account.icon}
                    </a>
                    <a
                      className="text-[#71717A] hover:text-gray-400 transition duration-150 ease-in-out secondary_text link-editable px-3"
                      href={account.href}
                    >
                      {account.name}
                    </a>
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0"></ul>
          <div className="text-sm text-[#71717A] hover:text-gray-400 mr-4">
            © {currentYear} Quiz Solution. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
