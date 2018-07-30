import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
		player(id: Int): Player
		team(id: Int): Team
		currentFixtures: CurrentFixtures
		nextFixtures: NextFixtures
		fixtures(id: Int): Fixtures
	}
	
	type Player {
		id: Int!
		first_name: String!
		second_name: String!
		web_name: String!
		total_points: Int!,
		event_points: Int!,
		team_code: Int!
		now_cost: Int!
		value_form: String!
		in_dreamteam: Boolean!
		selected_by_percent: String!
		form: String!
		transfers_in_event: Int!
		transfers_out_event: Int!
		news: String!
	}

	type Team {
		id: Int!
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

	type Fixtures {
		fixtures: [Fixture]
	}

	type CurrentFixtures {
		fixtures: [Fixture]!
	}

	type NextFixtures {
		fixtures: [Fixture]!
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
	}


`);

export default schema;