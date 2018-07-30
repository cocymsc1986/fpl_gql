import axios from 'axios';

const root = {
	player: async ({ id }) => {
		try {
			const { data } = await axios.get(`https://fantasy.premierleague.com/drf/elements`);
			const player = data.filter(el => el.id == id)[0];

			return player;
		} catch (err) {
			console.error('Error getting player data: ', err)
		}
	},

	team: async ({ id }) => {
		try {
			const { data } = await axios.get(`https://fantasy.premierleague.com/drf/teams`);
			const team = data.filter(el => el.code == id)[0];

			return team;
		} catch (err) {
			console.error('Error getting player data: ', err)
		}
	},

	fixtures: async ({ id }) => {
		try {
			const { data: gameweekData } = await axios.get(`https://fantasy.premierleague.com/drf/events`);
			const gameweek = gameweekData.filter(gw => gw.id == id)[0];

			const { data: fixtureData } = await  axios.get(`https://fantasy.premierleague.com/drf/fixtures`);
			const fixtures = fixtureData.filter(week => week.deadline_time === gameweek.deadline_time)

			return { fixtures };
		} catch (err) {
			console.error('Error getting player data: ', err)
		}
	},

	currentFixtures: async () => {
		try {
			const { data: gameweekData } = await axios.get(`https://fantasy.premierleague.com/drf/events`);
			const gameweek = gameweekData.filter(gw => gw.is_current === true)[0];

			const { data: fixtureData } = await  axios.get(`https://fantasy.premierleague.com/drf/fixtures`);
			const fixtures = fixtureData.filter(week => week.deadline_time === gameweek.deadline_time)
			return { fixtures };
		} catch (err) {
			console.error('Error getting player data: ', err)
		}
	},

	nextFixtures: async () => {
		try {
			const { data: gameweekData } = await axios.get(`https://fantasy.premierleague.com/drf/events`);
			const gameweek = gameweekData.filter(gw => gw.is_next === true)[0];

			const { data: fixtureData } = await  axios.get(`https://fantasy.premierleague.com/drf/fixtures`);
			const fixtures = fixtureData.filter(week => week.deadline_time === gameweek.deadline_time);

			return { fixtures };
		} catch (err) {
			console.error('Error getting player data: ', err)
		}
	}
};

export default root;