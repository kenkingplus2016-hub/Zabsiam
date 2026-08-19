require('dotenv').config();
const Imap = require('imap');
const { simpleParser } = require('mailparser');
const nodemailer = require('nodemailer');
const ics = require('ics');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const imapConfig = {
    user: emailUser,
    password: emailPass,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

const imap = new Imap(imapConfig);

function openInbox(cb) {
    imap.openBox('INBOX', false, cb);
}

imap.once('ready', function() {
    console.log('✅ Connected to Gmail via IMAP');
    openInbox(function(err, box) {
        if (err) throw err;
        console.log('📥 Inbox opened. Listening for new emails...');
        
        // Listen for new mail
        imap.on('mail', function(numNewMsgs) {
            console.log(`📬 Received ${numNewMsgs} new message(s)!`);
            fetchUnreadEmails();
        });
    });
});

function fetchUnreadEmails() {
    imap.search(['UNSEEN'], function(err, results) {
        if (err) throw err;
        if (!results || results.length === 0) {
            console.log('No new unread emails found.');
            return;
        }

        const f = imap.fetch(results, { bodies: '' });
        f.on('message', function(msg, seqno) {
            msg.on('body', function(stream, info) {
                simpleParser(stream, async (err, parsed) => {
                    if (err) throw err;
                    
                    const senderEmail = parsed.from.value[0].address;
                    
                    // PREVENT INFINITE LOOP: Ignore emails sent by the bot itself
                    if (senderEmail === emailUser || (parsed.subject && parsed.subject.includes('New Catering Booking'))) {
                        console.log(`Skipping bot's own email: ${parsed.subject}`);
                        return;
                    }

                    console.log(`\n📧 New Email From: ${parsed.from.text}`);
                    console.log(`Subject: ${parsed.subject}`);
                    
                    // Simple logic to detect "booking" or "catering"
                    const text = parsed.text ? parsed.text.toLowerCase() : "";
                    if (text.includes('booking') || text.includes('catering') || text.includes('จัดเลี้ยง')) {
                        console.log('📅 Found booking inquiry! Creating Calendar Event...');
                        createCalendarEvent(parsed);
                    }
                });
            });
            msg.once('attributes', function(attrs) {
                // Mark as read
                imap.addFlags(attrs.uid, ['\\Seen'], function(err) {
                    if (err) console.log(err);
                });
            });
        });
    });
}

function createCalendarEvent(emailData) {
    const event = {
        start: [2026, 8, 25, 18, 0], // Placeholder date
        duration: { hours: 4 },
        title: 'Zab Siam Catering Event',
        description: `Booking inquiry from: ${emailData.from.text}\n\nEmail Content:\n${emailData.text}`,
        location: 'London, UK',
        status: 'CONFIRMED',
        busyStatus: 'BUSY'
    };

    ics.createEvent(event, (error, value) => {
        if (error) {
            console.log(error);
            return;
        }
        
        const mailOptions = {
            from: emailUser,
            to: emailUser,
            subject: '📅 New Catering Booking Added to Calendar',
            text: 'A new catering inquiry has been processed and attached as a calendar event.',
            icalEvent: {
                filename: 'booking.ics',
                method: 'request',
                content: value
            }
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('✅ Calendar Event Sent and Synced! ' + info.response);
            }
        });
    });
}

imap.once('error', function(err) {
    console.log('IMAP Error: ' + err);
});

imap.once('end', function() {
    console.log('Connection ended');
});

// Connect
imap.connect();
