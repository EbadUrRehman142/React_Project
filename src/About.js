function About() {
  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: 'rgb(144 102 241 / 12%)',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '3rem',
      color: '#333',
      textAlign: 'center',
      marginBottom: '1rem',
    },
    paragraph: {
      fontSize: '1.2rem',
      color: '#555',
      lineHeight: '1.6',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>
      <p style={styles.paragraph}>
        We are a leading e-commerce platform offering a wide range of products for every need. 
        Our mission is to provide high-quality products at competitive prices, ensuring a 
        seamless shopping experience for all our customers.
      </p>
    </div>
  );
}

export default About;
