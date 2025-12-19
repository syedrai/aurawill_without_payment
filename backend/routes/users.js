const express = require('express');
const router = express.Router();

// Contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Here you would typically save to database and send email
    console.log('Contact form submission:', { name, email, phone, message });
    
    res.json({ message: 'Thank you for contacting us! We will get back to you soon.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Newsletter subscription
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Save email to newsletter list
    console.log('Newsletter subscription:', email);
    
    res.json({ message: 'Successfully subscribed to newsletter!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;