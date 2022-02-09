
	mapboxgl.accessToken = 'pk.eyJ1IjoibWFzb25maWJraW5zIiwiYSI6ImNreXc5aDk3aDA0aDYyeG1zNDRpM2RpeWMifQ.I8SdElcrkMN7YquIHLOx8w';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [22.4172, -5],
        zoom: 3.5
    });



    map.on('load', () => {

        map.addSource('cow', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Cow Program</strong> <p>Living loans of cows to subsistence farmers who have successfully trained and prepared their farms.</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [38.5, 2.85]
                        }
                    }

                ]
            }
        });

        map.addSource('education', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Education Program</strong> <p>MPA supports access to financial services and education, and encourages partners with schools to include microfinancing in their curriculums through a unique and developing scholarship program.</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [18.4172, -2.7]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Education Program</strong> <p>MPA supports access to financial services and education, and encourages partners with schools to include microfinancing in their curriculums through a unique and developing scholarship program.</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [39.4172, -2.7]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Education Program</strong> <p>MPA supports access to financial services and education, and encourages partners with schools to include microfinancing in their curriculums through a unique and developing scholarship program.</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [37, 2.7]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Education Program</strong> <p>MPA supports access to financial services and education, and encourages partners with schools to include microfinancing in their curriculums through a unique and developing scholarship program.</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [39.1, -10]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Education Program</strong> <p>MPA supports access to financial services and education, and encourages partners with schools to include microfinancing in their curriculums through a unique and developing scholarship program.</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [31, -14]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Education Program</strong> <p>MPA supports access to financial services and education, and encourages partners with schools to include microfinancing in their curriculums through a unique and developing scholarship program.</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [28.4, -21]
                        }
                    }
                ]
            }
        });
        // Add a layer showing the education.
        map.addLayer({
            'id': 'education',
            'type': 'circle',
            'source': 'education',
            'paint': {
                'circle-color': '#fec328',
                'circle-radius': 8,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
            }
        });

        map.addLayer({
            'id': 'cow',
            'type': 'circle',
            'source': 'cow',
            'paint': {
                'circle-color': '#d55900',
                'circle-radius': 8,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
            }
        });

        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('mouseenter', 'education', (e) => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseleave', 'education', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });


        map.on('mouseenter', 'cow', (e) => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseleave', 'cow', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });


    




    map.on('load', function() {
        map.addLayer(
          {
            id: 'country-boundaries',
            source: {
              type: 'vector',
              url: 'mapbox://mapbox.country-boundaries-v1',
            },
            'source-layer': 'country_boundaries',
            type: 'fill',
            paint: {
              'fill-color': '#00989d',
              'fill-opacity': .99,
            },
          },
          'country-label'
        );
  
        map.setFilter('country-boundaries', [
          "in",
          "iso_3166_1_alpha_3",
          'KEN',
          'TZA',
          'UGA',
          'COD',
          'ZMB',
          'ZWE'
        ]);
      });

