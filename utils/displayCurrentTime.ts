export const displayCurrentTime = () => {
    // Get the current date and time
    const now = new Date()

    // Format the date and time in a user-friendly format
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    }).format(now)

    // Display the formatted date and time
    console.log(`The time is: ${formattedDate}`)

    return formattedDate
}
