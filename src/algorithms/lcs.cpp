// Description: Longest Common Subsequence by Miguel Angel Sanchez Lopez A00834038
#include <iostream>
#include <vector>
#include <string>
#include <tuple>
#include <algorithm> // Para reverse

using namespace std;

tuple<int, vector<string>, vector<vector<int>>, vector<vector<int>>, vector<int*>> LCS(string &t1, string &t2) {
    int n = t1.size();
    int m = t2.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0)); // Matriz de DP
    int tamano = 0;  // Longitud de la subsecuencia más larga
    
    vector<pair<int, int>> endIndexes; // Para almacenar todas las posiciones con la subsecuencia más larga
    vector<int*> memoryLocations; // Para almacenar las ubicaciones de memoria de dp[i][j]

    // Para almacenar los índices de coincidencia en t1 y t2
    vector<vector<int>> allT1Indexes;
    vector<vector<int>> allT2Indexes;

    // Llenar la matriz de DP
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (t1[i - 1] == t2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                // Guardar la dirección de memoria de dp[i][j]
                memoryLocations.push_back(&dp[i][j]);

                if (dp[i][j] > tamano) {
                    tamano = dp[i][j];
                    endIndexes.clear(); // Si encontramos una subsecuencia más larga, vaciamos las ocurrencias anteriores
                    endIndexes.push_back({i, j});
                } else if (dp[i][j] == tamano) {
                    endIndexes.push_back({i, j}); // Guardar todas las ocurrencias con el mismo tamaño
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }

    // Reconstruir todas las subsecuencias comunes más largas (LCS)
    vector<string> allLCS;
    for (auto [endI, endJ] : endIndexes) {
        string lcs = "";
        vector<int> t1Indexes;
        vector<int> t2Indexes;

        int i = endI;
        int j = endJ;
        while (i > 0 && j > 0 && dp[i][j] > 0) {
            lcs = t1[i - 1] + lcs; // Añadir el carácter a la LCS
            t1Indexes.push_back(i - 1); // Guardar el índice en t1
            t2Indexes.push_back(j - 1); // Guardar el índice en t2
            i--;
            j--;
        }

        // Invertir los índices para que queden en orden ascendente
        reverse(t1Indexes.begin(), t1Indexes.end());
        reverse(t2Indexes.begin(), t2Indexes.end());

        // Guardar el LCS y los índices
        allLCS.push_back(lcs);
        allT1Indexes.push_back(t1Indexes);
        allT2Indexes.push_back(t2Indexes);
    }

    // Devolver la longitud de la LCS, todas las subsecuencias, los índices de coincidencia y las ubicaciones de memoria
    return make_tuple(tamano, allLCS, allT1Indexes, allT2Indexes, memoryLocations);
}

int main() {
    string t1 = "cabcbabacc";
    string t2 = "aabcaba";

    // Llamar a la función LCS y capturar la tupla de resultados
    auto result = LCS(t1, t2);

    // Obtener cada valor desde la tupla
    int tamano = get<0>(result);
    vector<string> allLCS = get<1>(result);
    vector<vector<int>> allT1Indexes = get<2>(result);
    vector<vector<int>> allT2Indexes = get<3>(result);
    vector<int*> memoryLocations = get<4>(result);

    // Imprimir resultados
    cout << "LCS length: " << tamano << endl;
    cout << "All LCS: " << endl;
    for (const auto& lcs : allLCS) {
        cout << lcs << endl;
    }

    for (size_t k = 0; k < allLCS.size(); k++) {
        cout << "\nLCS #" << k + 1 << ":" << endl;
        cout << "t1 indexes: ";
        for (int idx : allT1Indexes[k]) {
            cout << idx << " ";
        }
        cout << endl;

        cout << "t2 indexes: ";
        for (int idx : allT2Indexes[k]) {
            cout << idx << " ";
        }
        cout << endl;
    }

    // Imprimir las ubicaciones de memoria de dp[i][j]
    cout << "Memory locations of dp[i][j] where LCS characters matched:" << endl;
    for (int* loc : memoryLocations) {
        cout << loc << " (value: " << *loc << ")" << endl;
    }

    return 0;
}
