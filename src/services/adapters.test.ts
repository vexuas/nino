import { mapRelationship, mapRelationships } from './adapters';

const MOCK_RELATIONSHIPS = {
  data: [
    { id: '12', type: 'users' },
    { id: '23', type: 'users' },
    { id: '41', type: 'users' },
  ],
};
const MOCK_RELATIONSHIP = { data: { id: '12', type: 'users' } };
const MOCK_INCLUDED = [
  { id: '12', type: 'users', attributes: { firstName: 'Kimchi', email: 'kimchi@saleswhale.com' } },
  { id: '21', type: 'users', attributes: { firstName: 'Ginger', email: 'ginger@saleswhale.com' } },
  { id: '23', type: 'users', attributes: { firstName: 'Kovu', email: 'kovu@saleswhale.com' } },
  { id: '41', type: 'users', attributes: { firstName: 'Prince', email: 'prince@saleswhale.com' } },
];

describe('mapRelationships', () => {
  it('returns an array of matched `included` objects correctly', () => {
    expect(mapRelationships(MOCK_RELATIONSHIPS, MOCK_INCLUDED)).toEqual([
      MOCK_INCLUDED[0],
      MOCK_INCLUDED[2],
      MOCK_INCLUDED[3],
    ]);
  });
  it('returns an empty array if relationships data is null', () => {
    expect(mapRelationships({ data: null }, MOCK_INCLUDED)).toEqual([]);
  });
  it('returns an empty array if included is undefined', () => {
    expect(mapRelationships(MOCK_RELATIONSHIPS)).toEqual([]);
  });
});
describe('mapRelationship', () => {
  it('returns the matched `included` object correctly', () => {
    expect(mapRelationship(MOCK_RELATIONSHIP, MOCK_INCLUDED)).toEqual(MOCK_INCLUDED[0]);
  });
  it('returns null if relationships data is null', () => {
    expect(mapRelationship({ data: null }, MOCK_INCLUDED)).toEqual(null);
  });
  it('returns null if included is undefined', () => {
    expect(mapRelationship(MOCK_RELATIONSHIP)).toEqual(null);
  });
});
