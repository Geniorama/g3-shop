import {
  TextField,
  Grid,
  Box,
  Button,
  Stack,
  Checkbox,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { validateEmail, validatePhone } from "@/utils/validation";
import ReCAPTCHA from "react-google-recaptcha";

export type DataProps = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  captchaToken?: string | null
};

const initialDataForm: DataProps = {
  name: "",
  email: "",
  phone: "",
  message: "",
  captchaToken: ""
};

export default function FormContact() {
  const [data, setData] = useState<DataProps>(initialDataForm);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const sendMessage = async () => {
    let dataWithToken
    if(data){
      dataWithToken = {
        ...data,
        captchaToken: captchaToken
      }
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataWithToken),
      });
      
      if (res.ok) {
        console.log("Mensaje enviado");
      }
      
    } catch (error) {
      console.error("Error", error);
    }
  };

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (!data?.name || data.name.trim() === "") {
      setError("The name field is required");
      return;
    }

    if (!data?.email || data.email.trim() === "") {
      setError("The email field is required");
      return;
    }

    if (!validateEmail(data.email)) {
      setError("The email format is not valid");
      return;
    }

    if (data?.phone && !validatePhone(data.phone)) {
      setError("The number phone is not valid");
      return;
    }

    if (!data?.phone || data.phone.trim() === "") {
      setError("The phone field is required");
      return;
    }

    setError(null);

    await sendMessage();

    setSuccess("Your message has been sent successfully");
    setData(initialDataForm);
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  return (
    <Box>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          label="Name"
          placeholder="Your Name"
          sx={{ width: { xs: "100%", md: "50%" } }}
          name="name"
          onChange={(e) => handleChange(e)}
          value={data.name}
        />

        <TextField
          type="email"
          label="Email"
          placeholder="Your Email"
          sx={{ width: { xs: "100%", md: "50%" } }}
          name="email"
          onChange={(e) => handleChange(e)}
          value={data.email}
        />
      </Stack>

      <TextField
        label="Phone"
        type="number"
        placeholder="Your Phone"
        sx={{ width: "100%", my: { xs: 2 } }}
        name="phone"
        onChange={(e) => handleChange(e)}
        value={data.phone}
      />

      <TextField
        label="Message"
        multiline
        placeholder="Your comments"
        sx={{ width: "100%" }}
        rows={5}
        name="message"
        onChange={(e) => handleChange(e)}
        value={data.message}
      />

      <Typography lineHeight={"1em"} fontSize={"12px"} my={2}>
        By clicking &quot;<b>SEND MESSAGE</b>&quot;, you agree to our{" "}
        <Link
          position={"relative"}
          display={"inline-block"}
          href="/privacy-policy"
          target="_blank"
        >
          data processing policies
        </Link>
        .
      </Typography>

      <Box mb={{xs: 2}}>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={onCaptchaChange}
        />
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: { xs: 2 } }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: { xs: 2 } }}>
          {error}
        </Alert>
      )}
      <Button disabled={captchaToken ? false : true} onClick={handleSubmit} variant="contained" color="secondary">
        SEND MESSAGE
      </Button>
    </Box>
  );
}
