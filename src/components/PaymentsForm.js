import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import Checkbox from "@mui/material/Checkbox";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "./UI/Input";
// import AddCardIcon from '@mui/icons-material/AddCard';
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

const PaymentsForm = () => {
  const [coupon, setCoupon] = useState("");
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [applyLoading, setapplyLoading] = useState(false);
  const [useDefault, setUseDefault] = useState(false);
  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    if (stripe || elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.on("change", function (event) {
          // var displayError = document.getElementById("card-errors");
          if (event.error) {
            console.log(event.error.message);
            // displayError.textContent = event.error.message;
          }

          if (event.complete) {
            console.log("complete");
          }
        });
      }
    }
  }, [stripe, elements]);

  const validateCoupon = async () => {
    console.log("call to validate coupon api");
    setapplyLoading(true);
    try {
      const response = await axios.post(
        "http://35.84.183.132:8000/payment/verify-coupon",
        {
          coupon_code: coupon,
        },
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyNzk5MDA2LCJpYXQiOjE2NjAyMDcwMDYsImp0aSI6ImI2MzUxYzIzMjM1MDQzZmZhZDViYzdhYTEwZjMwMWZlIiwidXNlcl9pZCI6MTB9.EYohZ-Ph8mFUtXr_gl4UNHASiyAcLzUGaEdxxlgw2GgZolEAwlbQKf8r8Q5jSVpjvf-4npQc0RjukiB9F7aKFg`,
          },
        }
      );
      console.log(response);
      setapplyLoading(false);
      setIsCouponValid(true);
      // setCouponPer(response.data.percent_off);
    } catch (e) {
      setapplyLoading(false);
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!useDefault) {
      //Create a Token To Add Card
      const cardElement = elements.getElement(CardElement);
      try {
        const response = await stripe.createToken(cardElement);

        console.log("Created Token Using createToken");
        console.log("Token", response?.token?.id);
        console.log("Call To AddCard Api With Bearer & Token");

        const addCardResponse = await axios.post(
          "http://35.84.183.132:8000/payment/add-card",
          {
            token: response?.token?.id,
          },
          {
            headers: {
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyNzk5MDA2LCJpYXQiOjE2NjAyMDcwMDYsImp0aSI6ImI2MzUxYzIzMjM1MDQzZmZhZDViYzdhYTEwZjMwMWZlIiwidXNlcl9pZCI6MTB9.EYohZ-Ph8mFUtXr_gl4UNHASiyAcLzUGaEdxxlgw2GgZolEAwlbQKf8r8Q5jSVpjvf-4npQc0RjukiB9F7aKFg",
            },
          }
        );
        console.log("Add Card Response:", addCardResponse);
      } catch (e) {
        console.log("Error While Creating Token & Adding Card", e);
      }
    }
    //ON SUCCESSFUL OF ADD CARD API CALL
    //Create Payment Intent On The Server
    try {
      const createSubResp = await axios.post(
        "http://35.84.183.132:8000/payment/create-subscription",
        {
          package: "prod_MBjVoP8HBObOSU",
          coupon: "TESTCOUPONMBCREDIBLOCK",
        },
        {
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyNzk5MDA2LCJpYXQiOjE2NjAyMDcwMDYsImp0aSI6ImI2MzUxYzIzMjM1MDQzZmZhZDViYzdhYTEwZjMwMWZlIiwidXNlcl9pZCI6MTB9.EYohZ-Ph8mFUtXr_gl4UNHASiyAcLzUGaEdxxlgw2GgZolEAwlbQKf8r8Q5jSVpjvf-4npQc0RjukiB9F7aKFg",
          },
        }
      );

      console.log("Create Payment Intent Response(success,3d):", createSubResp);
      console.log(
        "payment_intent",
        createSubResp?.payment_intent?.next_action?.redirect_to_url?.url
      );
    } catch (e) {
      console.log("Backend Error{create Subscription)", e);
    }

    //Confirm Payment On Client
    // const { error: stripeError, paymentIntent } =
    //   await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: elements.getElement(CardElement),
    //     },
    //   });
    // if (stripeError) {
    //   console.log(stripeError);
    //   return;
    // }
  };

  return (
    <div>
      <Container maxWidth="sm" sx={{ marginTop: "5rem" }}>
        <Paper elevation={5}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5} px={4} py={4}>
              {useDefault ? null : (
                <FormLabel sx={{ textAlign: "left" }}>
                  ADD CARD DETAILS
                  <div style={{ paddingTop: "1rem" }}>
                    <CardElement />
                  </div>
                </FormLabel>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    // inputProps={{ "aria-label": "Checkbox demo" }}
                    checked={useDefault}
                    onChange={(e) => setUseDefault(e.target.checked)}
                    color="success"
                  />
                }
                label="Use Default Card"
              />

              {/* <h3 id="card-errors"></h3> */}
              <Stack direction={"row"} spacing={1}>
                {/* <Input type="text" required label="COUPON CODE"  /> */}
                <TextField
                  type={"text"}
                  label={"COUPON CODE"}
                  variant={"outlined"}
                  sx={{ width: "50%" }}
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                  }}
                />
                <LoadingButton
                  variant={"contained"}
                  sx={{ width: "30%" }}
                  onClick={validateCoupon}
                  loading={applyLoading}
                  loadingPosition={"start"}
                  disabled={isCouponValid}
                  startIcon={<LocalActivityIcon />}
                >
                  {isCouponValid ? "Applied" : "Apply"}
                </LoadingButton>
              </Stack>
              <Button
                type="submit"
                variant="contained"
                disabled={!stripe && !elements}
              >
                Add Card
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default PaymentsForm;
