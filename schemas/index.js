import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
		player(id: Int): Player
		playersByTeam(team: Int): PlayersByTeam
		playerWithHighestProp(prop: String): PlayerWithHighestProp
		playerWithLowestProp(prop: String): PlayerWithLowestProp
		playersByProp(prop: String, amount: Int, reverseOrder: Boolean): PlayersByProp
		playersByPropAndPos(prop: String, position: String, amount: Int, reverseOrder: Boolean): PlayersByPropAndPos
		allTeams: AllTeams
		team(id: Int): Team
		fixtures(id: Int): Fixtures
		getTeamsFixtures(id: Int, amount: Int): GetTeamsFixtures
		getAllTeamsFixtures: GetAllTeamsFixtures
		playersSearch(term: String, amount: Int): PlayersSearch
		eventStatus: EventStatus
	}

	type EventStatus {
		status: [GameweekStatus]
		leagues: String!
	}

	type GameweekStatus {
		bonus_added: Boolean!
		date: String!
		event: Int!
		points: String!
	}
	
	type Player {
		id: Int!
		first_name: String!
		second_name: String!
		web_name: String!
		total_points: Int!,
		event_points: Int!,
		team: Int!
		now_cost: Int!
		value_form: String!
		in_dreamteam: Boolean!
		selected_by_percent: String!
		form: String!
		transfers_in_event: Int!
		transfers_out_event: Int!
		news: String!
		element_type: Int!
		status: String
		squad_number: Int
		chance_of_playing_this_round: Int
		chance_of_playing_next_round: Int
		points_per_game: String
		goals_scored: Int
		assists: Int
		clean_sheets: Int
		goals_conceded: Int
		own_goals: Int
		penalties_saved: Int
		penalties_missed: Int
		yellow_cards: Int
		red_cards: Int
		saves: Int
		bonus: Int
		influence: String
		creativity: String
		threat: String
		code: Int
		team_code: Int
	}

	type AllTeams {
		teams: [Team]
	}

	type Team {
		id: Int!
		code: Int!
		name: String!
		short_name: String!
		current_event_fixture: [TeamFixture]
		next_event_fixture: [TeamFixture]
	}

	type TeamFixture {
		is_home: Boolean!
		opponent: Int!
		month: Int!
		day: Int!
	}

	type GetTeamsFixtures {
		fixtures: [Fixture]
		id: Int
	}

	type GetAllTeamsFixtures {
		fixtures: [[Fixture]]
	}

	type Fixtures {
		fixtures: [Fixture]
		id: Int
	}

	type Fixture {
		kickoff_time_formatted: String!
		started: Boolean!
		kickoff_time: String!
		team_h_score: Int
		team_a_score: Int
		finished: Boolean!
		team_a: Int!
		team_h: Int!
		team_h_difficulty: Int
		team_a_difficulty: Int
	}

	type PlayerWithHighestProp {
		player: Player
	}

	type PlayerWithLowestProp {
		player: Player
	}

	type PlayersByTeam {
		players: [Player]
	}

	type PlayersByProp {
		players: [Player]
	}

	type PlayersByPropAndPos {
		players: [Player]
	}

	type PlayersSearch {
		players: [Player]
	}
`);

export default schema;
