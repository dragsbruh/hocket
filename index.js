require("dotenv").config();

const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

var topics = new Map();

app.post("/api/send/:topic", (req, res) => {
	const topic = req.params.topic;

	if (topic === undefined) {
		res.status(400);
		return res.json({
			status: "error",
			message:
				"Please specify a topic in the endpoint to send the message to. Ex: '/api/send/mytopic'.",
		});
	}

	const messageData = req.body.content;

	if (!messageData || !messageData.author || !messageData.content) {
		res.status(400);
		return res.json({
			status: "error",
			message: "Invalid message format. Author and content are required.",
		});
	}

	const attachment = messageData.attachment || null;

	const message = {
		author: messageData.author,
		content: messageData.content,
		attachment: attachment,
		createdAt: Date.now(),
	};

	if (!topics.has(topic)) {
		topics.set(topic, []);
	}

	topics.get(topic).push(message);

	setTimeout(() => {
		try {
			topics.delete(topic);
		} catch (e) {}
	}, 600000);

	res.json({ status: "success" });
});

app.get("/api/get/:topic", (req, res) => {
	const topic = req.params.topic;

	if (topic === undefined) {
		res.status(400);
		return res.json({
			status: "error",
			message:
				"Please specify a topic in the endpoint to get the message to. Ex: '/api/get/mytopic'.",
		});
	}
	if (topics.has(topic)) {
		res.status(200);
		return res.json({
			status: "success",
			data: topics.get(data),
		});
	} else {
		res.status(400);
		return res.json({
			status: "error",
			message: "Message not found.",
		});
	}
});

app.listen(PORT, () => {
	console.log("Express server listening on port", PORT);
});
