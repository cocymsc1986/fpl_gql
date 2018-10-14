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

	playersByTeam: async ({ team }) => {
		try {
			const { data } = await axios.get(`https://fantasy.premierleague.com/drf/elements`);
			const players = data.filter(player => player.team_code === team);
			return { players };
		} catch (err) {
			console.error('Error getting player data: ', err)
		}
	},

	playerWithHighestProp: async ({ prop }) => {
		try {
			const { data } = await axios.get(`https://fantasy.premierleague.com/drf/elements`);
			const player = data.reduce((a, b) => {
				if (typeof a[prop] !== Number) {
					return parseFloat(a[prop]) > parseFloat(b[prop]) ? a : b;
				}
				return a[prop] > b[prop] ? a : b;
			});

			return { player };
		} catch (err) {
			console.error('Error getting player data: ', err)
		}
	},

	playerWithLowestProp: async ({ prop }) => {
		try {
			const { data } = await axios.get(`https://fantasy.premierleague.com/drf/elements`);
			const player = data.reduce((a, b) => a[prop] < b[prop] ? a : b);

			return { player };
		} catch (err) {
			console.error('Error getting player data: ', err)
		}
	},

	playersByProp: async ({ prop, amount, reverseOrder = false }) => {
		try {
			const { data } = await axios.get(`https://fantasy.premierleague.com/drf/elements`);
			const players = 
				data.sort((a, b) => reverseOrder ? a[prop] - b[prop] : b[prop] - a[prop]).slice(0, amount);
			return { players };
		} catch (err) {
			console.error('Error getting player data: ', err)
		}
	},

	playersSearch: async ({ term, amount = 8 }) => {
		try {
			const { data } = await axios.get(`https://fantasy.premierleague.com/drf/elements`);
			const players = 
				data.filter(({ first_name, second_name }) => {
					const fullName = `${first_name} ${second_name}`;
					return fullName.toLowerCase().includes(term.toLowerCase());
				}).slice(0, amount);
			return { players };
		} catch (err) {
			console.error('Error getting player data: ', err)
		}
	},

	playersByPropAndPos: async ({ prop, position, amount, reverseOrder = false }) => {
		try {
			const { data } = await axios.get(`https://fantasy.premierleague.com/drf/elements`);
			const positionMap = {
				goalkeeper: 1,
				defender: 2,
				midfielder: 3,
				forward: 4
			}
			
			const players = data
				.filter(player => player.element_type === positionMap[position])
				.sort((a, b) => reverseOrder ? a[prop] - b[prop] : b[prop] - a[prop]).slice(0, amount);

			return { players };
		} catch (err) {
			console.error('Error getting player data: ', err)
		}
	},

	team: async ({ id }) => {
		try {
			const { data } = await axios.get(`https://fantasy.premierleague.com/drf/teams`);
			const team = data.filter(el => el.id == id)[0];

			return team;
		} catch (err) {
			console.error('Error getting team data: ', err)
		}
	},

	allTeams: async () => {
		try {
			const { data: teams } = await axios.get(`https://fantasy.premierleague.com/drf/teams`);
			
			return { teams };
		} catch (err) {
			console.error('Error getting team data: ', err)
		}
	},

	fixtures: async ({ id = null }) => {
		try {
			const { data: gameweekData } = await axios.get(`https://fantasy.premierleague.com/drf/events`);
			const gameweek = gameweekData.filter(gw => !id ? gw.is_current === true : gw.id == id)[0] ;

			const { data: fixtureData } = await axios.get(`https://fantasy.premierleague.com/drf/fixtures`);
			const fixtures = fixtureData.filter(week => week.deadline_time === gameweek.deadline_time)
			return { fixtures, id: gameweek.id };
		} catch (err) {
			console.error('Error getting fixture data: ', err)
		}
	},

	getTeamsFixtures: async ({ id, amount }) => {
		try {
			const { data: fixtureData } = await axios.get(`https://fantasy.premierleague.com/drf/fixtures`);
			const fixtures = fixtureData.filter(week => week.started === false && (week.team_a === id || week.team_h === id)).slice(0, amount);
			return { fixtures, id };
		} catch (err) {
			console.error('Error getting teams fixtures: ', err)
		}
	},

	getAllTeamsFixtures: async () => {
		try {
			const { data: fixtureData } = await axios.get(`https://fantasy.premierleague.com/drf/fixtures`);
			const fixtures = fixtureData.filter(week => week.started === false);

			const { data: teams } = await axios.get(`https://fantasy.premierleague.com/drf/teams`);
			const teamSortedFixtures = teams.map(team => fixtures.filter(fixture => fixture.team_h === team.id || fixture.team_a === team.id));

			return { fixtures: teamSortedFixtures };
		} catch (err) {
			console.error('Error getting teams fixtures: ', err)
		}
	}
};

export default root;