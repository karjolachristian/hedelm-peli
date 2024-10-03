var symbolit = ['🍎', '🍐', '🍒', '🍉', '7️⃣'];
        var rullat = document.getElementsByClassName('rulla');
        var rahat = 100;
        var toinenPyoraytys = false;

        function paivitaRahat() {
            document.querySelector('#rahat span').textContent = rahat;
        }

        function pyoritaRullat() {
            for (var i = 0; i < rullat.length; i++) {
                if (!rullat[i].classList.contains('lukittu')) {
                    var randomIndex = Math.floor(Math.random() * symbolit.length);
                    rullat[i].textContent = symbolit[randomIndex];
                    rullat[i].classList.add('pyorahda');
                    setTimeout(function(rulla) {
                        rulla.classList.remove('pyorahda');
                    }, 500, rullat[i]);
                }
            }
        }

        function laskeVoitto() {
            var panos = parseInt(document.getElementById('panos').value);
            var rullaArvot = [];
            for (var i = 0; i < rullat.length; i++) {
                rullaArvot.push(rullat[i].textContent);
            }

            if (rullaArvot.every(arvo => arvo === '7️⃣')) return panos * 10;
            if (rullaArvot.every(arvo => arvo === '🍎')) return panos * 6;
            if (rullaArvot.every(arvo => arvo === '🍉')) return panos * 5;
            if (rullaArvot.every(arvo => arvo === '🍐')) return panos * 4;
            if (rullaArvot.every(arvo => arvo === '🍒')) return panos * 3;

            var seiskatMaara = rullaArvot.filter(arvo => arvo === '7️⃣').length;
            if (seiskatMaara === 3) return panos * 5;

            return 0;
        }

        function pelaa() {
            var panos = parseInt(document.getElementById('panos').value);
            if (panos > rahat) {
                document.getElementById('viesti').textContent = 'Ei tarpeeksi rahaa!';
                return;
            }

            rahat -= panos;
            paivitaRahat();

            pyoritaRullat();

            setTimeout(function() {
                var voitto = laskeVoitto();
                if (voitto > 0) {
                    rahat += voitto;
                    paivitaRahat();
                    document.getElementById('viesti').textContent = 'Voitit ' + voitto + '€!';
                    toinenPyoraytys = false;
                    for (var i = 0; i < rullat.length; i++) {
                        rullat[i].classList.remove('lukittu');
                    }
                } else if (!toinenPyoraytys) {
                    document.getElementById('viesti').textContent = 'Ei voittoa. Voit lukita rullia ja yrittää uudelleen.';
                    toinenPyoraytys = true;
                } else {
                    document.getElementById('viesti').textContent = 'Ei voittoa.';
                    toinenPyoraytys = false;
                    for (var i = 0; i < rullat.length; i++) {
                        rullat[i].classList.remove('lukittu');
                    }
                }
            }, 500);
        }

        function nollaaPeli() {
            rahat = 100;
            paivitaRahat();
            document.getElementById('viesti').textContent = '';
            toinenPyoraytys = false;
            for (var i = 0; i < rullat.length; i++) {
                rullat[i].textContent = '';
                rullat[i].classList.remove('lukittu');
            }
        }

        function lukitseRulla(index) {
            if (toinenPyoraytys) {
                rullat[index].classList.toggle('lukittu');
            }
        }

        paivitaRahat();