import "./scss/Card.scss";
import InputSet from "./InputSet";

import neticon from "./svg/internet-icon.svg";
import phoneicon from "./svg/phone-icon.svg";
import homeicon from "./svg/home-icon.svg";
import flipicon from "./svg/flip-icon.svg";
import github from "./svg/Github.svg";

import { Formik, Form, Field, ErrorMessage, FormikErrors, FormikValues } from "formik";

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
function validateEmail(email: string) {
    return emailRegex.test(email);
}

const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
function validatePhone(phone: string) {
    return phoneRegex.test(phone);
}

const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i;
function validateUrl(url: string) {
    return urlRegex.test(url);
}

function getParentByClassName(el: HTMLElement, className: string) {
    while (el !== null && !el.classList.contains(className))
        el = el.parentElement as HTMLElement;
    return el;
}

function Card(props: { logo: string, initialValues: FormikValues }) {
    return (
        <Formik validateOnChange={true} initialValues={props.initialValues} onSubmit={(values, actions) => {
            console.log(values);
            actions.setSubmitting(false);
        }} validate={(values) => {
            var errors: FormikErrors<typeof values> = {};

            // Check if all properties are present
            if (!values.businessname)
                errors.businessname = "Required";
            if (!values.business)
                errors.business = "Required";
            if (!values.firstname)
                errors.firstname = "First name required";
            if (!values.lastname)
                errors.lastname = "Last name required";
            if (!values.jobtitle)
                errors.jobtitle = "Required";
            if (!values.phonenumber)
                errors.phonenumber = "Required";
            if (!values.altphonenumber)
                errors.altphonenumber = "Required";
            if (!values.personalemail)
                errors.personalemail = "Required";
            if (!values.businessemail)
                errors.businessemail = "Required";
            if (!values.address)
                errors.address = "Required";
            if (!values.mailing)
                errors.mailing = "Required";
            if (!values.github)
                errors.github = "Required";

            // Validate email patterns
            if (!errors.personalemail && !validateEmail(values.personalemail))
                errors.personalemail = "Invalid Email Address";
            if (!errors.businessemail && !validateEmail(values.businessemail))
                errors.businessemail = "Invalid Email Address";

            // Validate phone number patterns
            if (!errors.phonenumber && !validatePhone(values.phonenumber))
                errors.phonenumber = "Invalid Phone Number";
            if (!errors.altphonenumber && !validatePhone(values.altphonenumber))
                errors.altphonenumber = "Invalid Phone Number";
            
            // Validate the github url
            if (!errors.github && !validateUrl(values.github))
                errors.github = "Invalid URL";

            return errors;
        }}>
            <Form className="business-card">
                <fieldset id="back" className="back-side visible">
                    <button className="flip" type="button" onClick={(event) => {
                        let button: HTMLButtonElement = getParentByClassName(event.target as HTMLElement, "flip") as HTMLButtonElement,
                            [back, front] = getParentByClassName(button, "business-card").children;

                        back.classList.add("invisible");
                        button.setAttribute("disabled", "true");
                        back.setAttribute("disabled", "true");

                        back.addEventListener("transitionend", () => {
                            back.classList.remove("visible");
                            front.classList.add("visible");
                            front.classList.remove("invisible");

                            front.removeAttribute("disabled");
                            (front.firstElementChild as HTMLButtonElement).removeAttribute("disabled");
                        }, {once: true});
                    }}>
                        <img src={flipicon} alt="flip"/>
                    </button>
                
                    <div className="content">
                        <img src={github} alt={github}/>
                        <div className="caption">Your Github</div>

                        <Field type="text" name="github" placeholder="Github"/>
                        <ErrorMessage name="github" render={(msg) => <div className="error-message">{msg}</div>}/>
                    </div>
                </fieldset>

                <fieldset id="front" className="front-side invisible">
                    <button className="flip" type="button" onClick={(event) => {
                        let button: HTMLButtonElement = getParentByClassName(event.target as HTMLElement, "flip") as HTMLButtonElement,
                            [back, front] = getParentByClassName(button, "business-card").children;

                        front.classList.add("invisible");
                        front.setAttribute("disabled", "true");

                        front.addEventListener("transitionend", () => {
                            front.classList.remove("visible");
                            back.classList.add("visible");
                            back.classList.remove("invisible");

                            back.removeAttribute("disabled");
                        }, {once: true});
                    }}>
                        <img src={flipicon} alt="flip"/>
                    </button>

                    <div className="logo">
                        <img src={props.logo} alt="Logo"/>

                        <div className="business-name">
                            <Field type="text" name="businessname" placeholder="Business name"/>
                            <ErrorMessage name="businessname" render={(msg) => <div className="error-message">{msg}</div>}/>
                        </div>

                        <Field className="business" type="text" name="business" placeholder="Slogan"/>
                        <ErrorMessage name="business" render={(msg) => <div className="error-message">{msg}</div>}/>
                    </div>
                    
                    <div className="right-side">
                        <fieldset className="card-name-input">
                            <div className="name-inputs">
                                <div className="inputs">
                                    <Field type="text" name="firstname" placeholder="First name"/>
                                    <Field type="text" name="lastname" placeholder="Last name"/>
                                </div>

                                <div className="errors">
                                    <ErrorMessage name="firstname" render={(msg) => <div className="error-message">{msg}</div>}/>
                                    <ErrorMessage name="lastname" render={(msg) => <div className="error-message">{msg}</div>}/>
                                </div>
                            </div>

                            <Field type="text" name="jobtitle" placeholder="Job title"/>
                            <ErrorMessage name="jobtitle" render={(msg) => <div className="error-message">{msg}</div>}/>
                        </fieldset>

                        <InputSet id="cellular" icon={phoneicon} inputs={[
                            { "type": "text", "name": "phonenumber", "placeholder": "Phone"},
                            { "type": "text", "name": "altphonenumber", "placeholder": "Alt Phone"}
                        ]}/>

                        <InputSet id="emails" icon={neticon} inputs={[
                            { "type": "email", "name": "personalemail", "placeholder": "Personal email"},
                            { "type": "email", "name": "businessemail", "placeholder": "Business email"}
                        ]}/>

                        <InputSet id="address" icon={homeicon} inputs={[
                            { "type": "text", "name": "address", "placeholder": "Address"},
                            { "type": "text", "name": "mailing", "placeholder": "Mailing Address"}
                        ]}/>

                        <button className="submit" type="submit">Complete</button>
                    </div>
                </fieldset>
            </Form>
        </Formik>
    );
}

export default Card;