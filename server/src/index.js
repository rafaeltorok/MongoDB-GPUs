const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./schemas/schemas');
const resolvers = require('./resolvers/resolvers');

async function startServer() {
	// More robust MongoDB connection handling
	console.log('Attempting to connect to MongoDB...');
	console.log('MongoDB URI configured:', process.env.MONGODB_URI ? 'Yes (URI set)' : 'No (URI missing)');
	
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('✅ Successfully connected to MongoDB');
	} catch (error) {
		console.error('❌ MongoDB connection error:', error.message);
		console.error('Error details:', {
			name: error.name,
			code: error.code,
		});
		// Fail fast if DB connection doesn't work
		process.exit(1);
	}

	// Setup Express
	const app = express();

	// Create Apollo server
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	// Start Apollo server
	await server.start();

	app.use(express.static('dist'));
	// Apply middleware to the GraphQL endpoint specifically
	// This ensures JSON parsing happens before Apollo middleware processes the request
	app.use(
		'/graphql',
		cors(),
		express.json(), // Parse JSON before passing to Apollo
		expressMiddleware(server, {
			context: async ({ req, res }) => ({ req, res }),
		})
	);

	// Add any other routes or middleware for the rest of your app
	// app.use(express.static('public')); // Example of other middleware

	// Start Express server
	const port = process.env.PORT || 4000;
	app.listen(port, () => {
		console.log(`Server running at: http://localhost:${port}/graphql`);
	});
}

startServer();