const timeZones = [
    'UTC', 'USA/New York', 'Europe/London',
    'Asia/Kolkata', 'Asia/Tokyo', 'Australia/Sydney'
];

let currIdx = Math.floor(Math.random() * 6);

console.log(`This is the time in ${timeZones[currIdx]} right now:`); // Only logs once

function ChangeTime() {
    const time = new Date();
    const FORM = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZones[currIdx],
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const TimeString = FORM.format(time);

    process.stdout.clearLine();  // Clear the previous line in the console
    process.stdout.cursorTo(0);  // Move cursor to the beginning of the line
    process.stdout.write(TimeString); // Update time in the same place
}

setInterval(ChangeTime, 1000);
ChangeTime();
