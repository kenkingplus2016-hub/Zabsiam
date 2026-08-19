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
    tlsOptions: { rejectUnauthorized: false },
    keepalive: { interval: 10000, idleInterval: 300000, forceNoop: true }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

let imap;

function startImap() {
    imap = new Imap(imapConfig);

    imap.once('ready', function() {
        console.log('✅ Connected to Gmail via IMAP');
        imap.openBox('INBOX', false, function(err, box) {
            if (err) throw err;
            console.log('📥 Inbox opened. Listening for new emails...');
            
            // Listen for new mail
            imap.on('mail', function(numNewMsgs) {
                console.log(`📬 Received ${numNewMsgs} new message(s)!`);
                fetchUnreadEmails();
            });
        });
    });

    imap.once('error', function(err) {
        console.log('IMAP Error: ' + err);
    });

    imap.once('end', function() {
        console.log('Connection ended, attempting to reconnect in 5 seconds...');
        setTimeout(startImap, 5000);
    });

    imap.connect();
}

function fetchUnreadEmails() {
    const today = new Date();
    imap.search(['UNSEEN', ['SINCE', today]], function(err, results) {
        if (err) {
            console.log("Search error:", err);
            return;
        }
        if (!results || results.length === 0) {
            console.log('No new unread emails found for today.');
            return;
        }

        const f = imap.fetch(results, { bodies: '' });
        f.on('message', function(msg, seqno) {
            msg.on('body', function(stream, info) {
                simpleParser(stream, async (err, parsed) => {
                    if (err) throw err;
                    
                    const senderEmail = parsed.from && parsed.from.value.length > 0 ? parsed.from.value[0].address : "";
                    const subject = parsed.subject ? parsed.subject.toLowerCase() : "";
                    
                    // PREVENT INFINITE LOOP
                    if (senderEmail === emailUser || subject.includes('new catering booking')) {
                        return;
                    }

                    console.log(`\n📧 New Email From: ${parsed.from ? parsed.from.text : "Unknown"}`);
                    console.log(`Subject: ${parsed.subject}`);
                    
                    const isWebsiteInquiry = subject.includes('customize:') || subject.includes('zab siam') || subject.includes('catering') || subject.includes('จัดเลี้ยง');
                    
                    const text = parsed.text ? parsed.text.toLowerCase() : "";
                    const hasKeywords = text.includes('catering') || text.includes('banquet') || text.includes('จัดเลี้ยง');

                    if (isWebsiteInquiry || hasKeywords) {
                        console.log('📅 Found VALID booking inquiry! Creating Calendar Event...');
                        createCalendarEvent(parsed);
                    } else {
                        console.log('⏭️ Ignored: Not a catering inquiry (Spam/Promotions).');
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
        description: `Booking inquiry from: ${emailData.from ? emailData.from.text : "Unknown"}\n\nEmail Content:\n${emailData.text}`,
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
            text: 'A new catering inquiry has been processed and attached as a calendar event.\n\nFrom: ' + (emailData.from ? emailData.from.text : "Unknown"),
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

// Start the bot
startImap();
