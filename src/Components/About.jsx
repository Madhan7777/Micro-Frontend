import React from 'react';
import { Container, Typography, Grid, Paper, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';


const StyledHeader = styled('header')({
  padding: '2rem 0',
  backgroundColor: '#007bff',
  color: 'white',
  textAlign: 'center',
});

const StyledSection = styled('section')({
  padding: '2rem 0',
});

const StyledPaper = styled(Paper)({
  padding: '2rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  marginBottom: '1rem',
});

const styles = {
  heading: {
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginBottom: '1rem',
    color: '#007bff',
  },
  paragraph: {
    marginBottom: '1rem',
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  teamMember: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
};

const About = () => {
  return (
    <div>
      <StyledHeader>
        <Typography variant="h2">About Us</Typography>
      </StyledHeader>
      <Container>
        <StyledSection>
          <Typography variant="h4" component="h2" sx={styles.sectionTitle}>
            Welcome to Our Food and Beverages Supply System
          </Typography>
          <Typography variant="body1" sx={styles.paragraph}>
            At F&BSS, we are dedicated to providing high-quality food and beverages to our customers. With a passion for excellence and a commitment to service, we supply a wide range of products that cater to diverse tastes and preferences.
          </Typography>
        </StyledSection>
        <StyledSection>
          <Typography variant="h4" component="h2" sx={styles.sectionTitle}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={styles.paragraph}>
            Our mission is to deliver exceptional food and beverage products that exceed our customers' expectations. We aim to build lasting relationships with our clients through reliability, quality, and innovation.
          </Typography>
        </StyledSection>
        <StyledSection>
          <Typography variant="h4" component="h2" sx={styles.sectionTitle}>
            Our Vision
          </Typography>
          <Typography variant="body1" sx={styles.paragraph}>
            We envision becoming a leading provider in the food and beverage industry, renowned for our dedication to quality, sustainability, and customer satisfaction. We strive to make a positive impact on the communities we serve.
          </Typography>
        </StyledSection>
        <StyledSection>
          <Typography variant="h4" component="h2" sx={styles.sectionTitle}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <StyledPaper elevation={3}>
                <Box sx={styles.teamMember}>
                  <StyledAvatar src="path/to/team-member1.jpg" alt="Team Member 1" />
                  <Typography variant="h6">Jane Doe</Typography>
                  <Typography variant="subtitle1">CEO & Founder</Typography>
                  <Typography variant="body2">
                    Jane is the driving force behind our company, with a vision for excellence and innovation in the food and beverage industry.
                  </Typography>
                </Box>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledPaper elevation={3}>
                <Box sx={styles.teamMember}>
                  <StyledAvatar src="path/to/team-member2.jpg" alt="Team Member 2" />
                  <Typography variant="h6">John Smith</Typography>
                  <Typography variant="subtitle1">Head of Operations</Typography>
                  <Typography variant="body2">
                    John ensures that our supply chain runs smoothly and efficiently, maintaining the highest standards in product delivery.
                  </Typography>
                </Box>
              </StyledPaper>
            </Grid>
            
          </Grid>
        </StyledSection>
      </Container>
    </div>
  );
};

export default About;
