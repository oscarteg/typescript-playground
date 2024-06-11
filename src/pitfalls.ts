const calendarEvent = {
	title: "Builder.io Conf",
	date: new Date(123),
	attendees: ["Steve"],
};

const shallowCopy = { ...calendarEvent };

// Unintensional mutation
shallowCopy.attendees.push("Bob");

// Unintensional mutation
shallowCopy.date.setTime(456);
