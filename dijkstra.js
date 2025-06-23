// dijkstra.js

const graph = {
    Delhi: [
        { city: "Mumbai", distance: 1400, cost: 5000, time: 24 },
        { city: "Kolkata", distance: 1500, cost: 4500, time: 26 },
        { city: "Ahmedabad", distance: 950, cost: 3000, time: 16 },
        { city: "Hyderabad", distance: 1500, cost: 4800, time: 25 }
    ],
    Mumbai: [
        { city: "Delhi", distance: 1400, cost: 5000, time: 24 },
        { city: "Pune", distance: 150, cost: 800, time: 3 },
        { city: "Bangalore", distance: 980, cost: 3500, time: 18 },
        { city: "Hyderabad", distance: 710, cost: 2500, time: 12 },
        { city: "Ahmedabad", distance: 530, cost: 1800, time: 9 }
    ],
    Kolkata: [
        { city: "Delhi", distance: 1500, cost: 4500, time: 26 },
        { city: "Chennai", distance: 1700, cost: 5500, time: 28 }
    ],
    Chennai: [
        { city: "Kolkata", distance: 1700, cost: 5500, time: 28 },
        { city: "Bangalore", distance: 350, cost: 1500, time: 6 }
    ],
    Bangalore: [
        { city: "Mumbai", distance: 980, cost: 3500, time: 18 },
        { city: "Chennai", distance: 350, cost: 1500, time: 6 },
        { city: "Hyderabad", distance: 570, cost: 2000, time: 10 },
        { city: "Pune", distance: 840, cost: 2800, time: 15 }
    ],
    Hyderabad: [
        { city: "Bangalore", distance: 570, cost: 2000, time: 10 },
        { city: "Mumbai", distance: 710, cost: 2500, time: 12 },
        { city: "Delhi", distance: 1500, cost: 4800, time: 25 }
    ],
    Pune: [
        { city: "Mumbai", distance: 150, cost: 800, time: 3 },
        { city: "Bangalore", distance: 840, cost: 2800, time: 15 }
    ],
    Ahmedabad: [
        { city: "Delhi", distance: 950, cost: 3000, time: 16 },
        { city: "Mumbai", distance: 530, cost: 1800, time: 9 }
    ]
};

function dijkstra(start, end, criteria) {
    const distances = {};
    const previous = {};
    const visited = {};
    const queue = [];

    for (let city in graph) {
        distances[city] = Infinity;
        previous[city] = null;
    }

    distances[start] = 0;
    queue.push({ city: start, distance: 0 });

    while (queue.length > 0) {
        queue.sort((a, b) => a.distance - b.distance);
        const { city: currentCity } = queue.shift();

        if (currentCity === end) break;

        if (!visited[currentCity]) {
            visited[currentCity] = true;

            for (let neighbor of graph[currentCity]) {
                let weight = neighbor[criteria];
                let newDistance = distances[currentCity] + weight;

                if (newDistance < distances[neighbor.city]) {
                    distances[neighbor.city] = newDistance;
                    previous[neighbor.city] = currentCity;
                    queue.push({ city: neighbor.city, distance: newDistance });
                }
            }
        }
    }

    if (distances[end] === Infinity) {
        return "No route found from " + start + " to " + end;
    }

    let path = [];
    let current = end;

    while (current) {
        path.unshift(current);
        current = previous[current];
    }

    let result = '';
    if (criteria === 'distance') result += "Shortest Route:\n";
    else if (criteria === 'cost') result += "Cheapest Route:\n";
    else if (criteria === 'time') result += "Fastest Route:\n";

    result += path.join(' -> ') + "\n\n";

    if (criteria === 'distance') result += "Total Distance: " + distances[end] + " km";
    else if (criteria === 'cost') result += "Total Cost: Rs. " + distances[end];
    else if (criteria === 'time') result += "Total Time: " + distances[end] + " hours";

    return result;
}
