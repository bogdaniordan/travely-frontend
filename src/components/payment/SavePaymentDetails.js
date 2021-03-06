import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {useStyles} from "../../styling/js-styling/CardDetailsStyling";
import {useForm} from "react-hook-form";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";

const SavePaymentDetails = ({closeModal}) => {
    const classes = useStyles();

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        defaultValues: {}
    });

    useEffect(() => {
        CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(res => reset(res.data.cardDetails))
    },[reset])

    return (
        <>
            <div className="modal-button-container">
                <Button color="secondary" className={classes.exitButton} onClick={closeModal} variant="contained">X</Button>
            </div>
            <div className="modal-dialog modal-confirm">
                <div className="modal-content" >
                    <div className="modal-body text-center" >
                    <main className={classes.layout}>
                        <form onSubmit={handleSubmit((data) =>{
                                CustomerService.saveCardDetails(data.cardName, data.cardNumber, data.expirationDate, data.cvv, AuthService.getCurrentUser().id).then(
                                    res => closeModal()
                                )
                            })
                        }>
                            <Typography component="h1" variant="h4" align="center">
                                Save new card details
                            </Typography>
                            <br/>
                            <br/>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="cardName"
                                        {...register("cardName", {required: true, minLength: 5, maxLength: 40})}
                                        label="Name on card"
                                        fullWidth
                                        autoComplete="cc-name"
                                        variant="standard"
                                    />
                                </Grid>
                                {errors.cardName && <span className="red-colored">Please enter a valid card name!</span>}
                                <Grid item xs={12}>
                                    <TextField
                                        id="cardNumber"
                                        {...register("cardNumber", {required: true, pattern: /^([0-9]{4}[\s-]?){3}([0-9]{4})$/})}
                                        label="Card number"
                                        fullWidth
                                        autoComplete="cc-number"
                                        variant="standard"
                                    />
                                </Grid>
                                {errors.cardNumber && <span className="red-colored">Please enter a valid card number!</span>}
                                <Grid item xs={12}>
                                    <TextField
                                        id="expDate"
                                        label="Expiry date"
                                        {...register("expirationDate", {required: true, minLength: 3, maxLength: 5})}
                                        fullWidth
                                        helperText="Card expiration date in month/year format"
                                        autoComplete="cc-exp"
                                        variant="standard"
                                    />
                                </Grid>
                                {errors.expirationDate && <span className="red-colored">Please enter a valid expiration date!</span>}
                                <Grid item xs={12}>
                                    <TextField
                                        id="cvv"
                                        label="CVV"
                                        {...register("cvv", {required: true, length: 3, pattern: /^[0-9]*$/})}
                                        helperText="Last three digits on signature strip"
                                        fullWidth
                                        autoComplete="cc-csc"
                                        variant="standard"
                                    />
                                </Grid>
                                {errors.cvv && <span className="red-colored">Please enter a valid CVV!</span>}
                                <Grid item xs={12}>
                                    <Button color="primary" type="submit" className={classes.saveCardDetails} variant="contained">Save details</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </main>
                    </div>
                </div>
            </div>
        </>

    );
}

export default SavePaymentDetails;