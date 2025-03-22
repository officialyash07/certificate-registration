import classes from "./Certificate.module.css";

export const Certificate = ({
    certificateId,
    csp,
    certificateLevel,
    certificateName,
    dateOfCertificate,
    dateOfExpiry,
    validity,
}) => {
    return (
        <tbody className={classes.certificate}>
            <tr>
                <td data-label="Certificate ID">{certificateId}</td>
                <td data-label="CSP">{csp}</td>
                <td data-label="Certificate Level">{certificateLevel}</td>
                <td data-label="Certificate Name">{certificateName}</td>
                <td data-label="Date of Certificate">{dateOfCertificate}</td>
                <td data-label="Date of Expiry">{dateOfExpiry}</td>
                <td data-label="Validity (in years)">{validity}</td>
            </tr>
        </tbody>
    );
};

export default Certificate;
