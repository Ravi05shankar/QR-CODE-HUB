import React, { useState, useRef } from "react";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
  Chip,
} from "@material-ui/core";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";

function App() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const [shouldScanWebCam, setShouldScanWebCam] = useState(false);

  const classes = useStyles();
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  const startWebCamScan = () => {
    setShouldScanWebCam(true);
  };

  const stopWebCamScan = () => {
    setShouldScanWebCam(false);
  };
  // const handleClick = () => {
  //   // console.info("You clicked the Chip.");
  // };
  return (
    <Container className={classes.container}>
      <Card>
        <h1 className={classes.title1}>QR CODE HUB</h1>
        <h2 className={classes.title}>Generate Download & Scan QR Code</h2>
        <CardContent>
          <Grid container spacing={2}>
            {/* this is for responsive purpose i am using like for small , large extra large midium extra small screen this value will be applied over there according to screen size */}

            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField
                label="Enter Text Here"
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => generateQrCode()}
              >
                Generate QR Code
              </Button>
              <br />
              <br />
              <br />
              {/* if imageUrl is there then qr-image will be showm over there otherwise null value will be shown
              also i have applied download section whenever i have clicked on image image directly will be download to your computer  */}
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" />
                  {/* <p>download qr code </p> */}

                  {/* <Chip label="Download QR" onClick={handleClick} /> */}
                  <Chip label="Download QR" onClick={true} />
                </a>
              ) : null}
            </Grid>

            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button
                className={classes.btn}
                variant="contained"
                color="secondary"
                onClick={onScanFile}
              >
                Scan Qr Code File
              </Button>
              <QrReader
                ref={qrRef}
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
              />
              <h3>Scanned Code: {scanResultFile}</h3>
            </Grid>

            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button
                className={classes.btn}
                variant="contained"
                color="secondary"
                onClick={shouldScanWebCam ? stopWebCamScan : startWebCamScan}
              >
                {shouldScanWebCam ? "Stop Scanning" : "Scan QR Code Web Cam"}
              </Button>
              {shouldScanWebCam && (
                <div>
                  <QrReader
                    delay={300}
                    style={{ width: "100%" }}
                    onError={handleErrorWebCam}
                    onScan={handleScanWebCam}
                  />
                  <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
                </div>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <p className={classes.copy}>
        Copyright. All rights reserved.© 2023 QR-CODE-HUB Company, Inc
      </p>
    </Container>
  );
}

// this is css part all the classname css value applied over there
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#3f51b5",
    color: "#fff",
    padding: 10,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
  title1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#607d8b",
    color: "#fff",
    padding: 10,
    margin: 0,
  },
  copy: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 0,
  },
  dwn: {
    padding: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    color: "#2196f3",
    // backgroundColor: "#263238",
    borderRadius: 5,
    onClick: true,
  },
}));

export default App;
