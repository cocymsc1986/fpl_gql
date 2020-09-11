import { request } from "../utils/request-helper";

const root = {
  player: async ({ id }) => {
    try {
      const {
        data: { elements },
      } = await request.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const player = elements.filter((el) => el.id == id)[0];

      return player;
    } catch (err) {
      console.error("Error getting player data: ", err);
    }
  },

  playersByTeam: async ({ team }) => {
    try {
      const {
        data: { elements },
      } = await request.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const players = elements.filter((player) => player.team === team);
      return { players };
    } catch (err) {
      console.error("Error getting player data: ", err);
    }
  },

  playerWithHighestProp: async ({ prop }) => {
    try {
      const {
        data: { elements },
      } = await request.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const player = elements.reduce((a, b) => {
        if (typeof a[prop] !== Number) {
          return parseFloat(a[prop]) > parseFloat(b[prop]) ? a : b;
        }
        return a[prop] > b[prop] ? a : b;
      });

      return { player };
    } catch (err) {
      console.error("Error getting player data: ", err);
    }
  },

  playerWithLowestProp: async ({ prop }) => {
    try {
      const {
        data: { elements },
      } = await request.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const player = elements.reduce((a, b) => (a[prop] < b[prop] ? a : b));

      return { player };
    } catch (err) {
      console.error("Error getting player data: ", err);
    }
  },

  playersByProp: async ({ prop, amount, reverseOrder = false }) => {
    try {
      const {
        data: { elements },
      } = await request.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const players = elements
        .sort((a, b) => (reverseOrder ? a[prop] - b[prop] : b[prop] - a[prop]))
        .slice(0, amount);
      return { players };
    } catch (err) {
      console.error("Error getting player data: ", err);
    }
  },

  playersSearch: async ({ term, amount = 8 }) => {
    try {
      const { data } = await request.post(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );

      const players = elements
        .filter(({ first_name, second_name }) => {
          const fullName = `${first_name} ${second_name}`;
          return fullName.toLowerCase().includes(term.toLowerCase());
        })
        .slice(0, amount);
      return { players };
    } catch (err) {
      console.error("Error getting player data: ", err);
    }
  },

  playersByPropAndPos: async ({
    prop,
    position,
    amount,
    reverseOrder = false,
  }) => {
    try {
      const {
        data: { elements },
      } = await request.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
          },
        }
      );

      console.log("****** ", elements);

      const positionMap = {
        goalkeeper: 1,
        defender: 2,
        midfielder: 3,
        forward: 4,
      };

      const players = elements
        .filter((player) => player.element_type === positionMap[position])
        .sort((a, b) => (reverseOrder ? a[prop] - b[prop] : b[prop] - a[prop]))
        .slice(0, amount);

      return { players };
    } catch (err) {
      console.error("Error getting player data: ", err);
    }
  },

  team: async ({ id }) => {
    try {
      const {
        data: { teams },
      } = await request.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const team = teams.filter((el) => el.id == id)[0];

      return team;
    } catch (err) {
      console.error("Error getting team data: ", err);
    }
  },

  allTeams: async () => {
    try {
      const {
        data: { teams },
      } = await request.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );

      return { teams };
    } catch (err) {
      console.error("Error getting team data: ", err);
    }
  },

  fixtures: async ({ id }) => {
    try {
      const gw = id ? id : 1;

      const { data: fixtures } = await request.get(
        `https://fantasy.premierleague.com/api/fixtures?event=${gw}`
      );

      return { fixtures, id: gw };
    } catch (err) {
      console.error("Error getting fixture data: ", err);
    }
  },

  getTeamsFixtures: async ({ id, amount }) => {
    try {
      const { data: fixtureData } = await request.get(
        "https://fantasy.premierleague.com/api/fixtures"
      );
      const fixtures = fixtureData
        .filter(
          (week) =>
            week.started === false && (week.team_a === id || week.team_h === id)
        )
        .slice(0, amount);
      return { fixtures, id };
    } catch (err) {
      console.error("Error getting teams fixtures: ", err);
    }
  },

  getAllTeamsFixtures: async () => {
    try {
      const { data: fixtureData } = await request.get(
        "https://fantasy.premierleague.com/api/fixtures"
      );
      const fixtures = fixtureData.filter((week) => week.started === false);

      const {
        data: { teams },
      } = await request.get(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const teamSortedFixtures = teams.map((team) =>
        fixtures.filter(
          (fixture) => fixture.team_h === team.id || fixture.team_a === team.id
        )
      );

      return { fixtures: teamSortedFixtures };
    } catch (err) {
      console.error("Error getting teams fixtures: ", err);
    }
  },
};

export default root;
