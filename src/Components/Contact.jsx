import React from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';


const StyledSection = styled('section')({
  padding: '4rem 0',
  backgroundColor: '#f5f5f5',
});

const StyledMap = styled('iframe')({
  width: '100%',
  height: '400px',
  border: 'none',
});

const StyledPaper = styled(Paper)({
  padding: '2rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const styles = {
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    width: '100%',
  },
  button: {
    marginTop: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
};

const Contact = () => {
  return (
    <StyledSection id="contact">
      <Container>
        <Typography variant="h4" component="h1" sx={styles.heading}>
          <span style={{ color: '#007bff' }}>Contact</span> Us
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <StyledMap
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11993.267641772954!2d-72.8480109!3d41.2802068!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x36c6fa619c4f5603!2sMcDonald&#39;s!5e0!3m2!1sen!2s!4v1633364807635!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography variant="h5" gutterBottom>
                Get in Touch
              </Typography>
              <form style={styles.form}>
                <TextField
                  label="Name"
                  variant="outlined"
                  style={styles.input}
                />
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  style={styles.input}
                />
                <TextField
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  style={styles.input}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={styles.button}
                >
                  Contact Now
                </Button>
              </form>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default Contact;
