#include <iostream>
#include <string>
#include <vector>
using namespace std;

string manacher(const string &s)
{
    int N = s.length();
    if (N == 0)
        return "";

    N = 2 * N + 1;       // Position count
    vector<int> L(N, 0); // LPS Length Array
    L[0] = 0;
    L[1] = 1;
    int C = 1; // centerPosition
    int R = 2; // centerRightPosition
    int maxLPSLength = 0;
    int maxLPSCenterPosition = 0;

    for (int i = 2; i < N; i++)
    {
        int iMirror = 2 * C - i;
        int diff = R - i;
        if (diff > 0)
            L[i] = min(L[iMirror], diff);

        while (((i + L[i]) < N && (i - L[i]) > 0) &&
               (((i + L[i] + 1) % 2 == 0) ||
                (s[(i + L[i] + 1) / 2] == s[(i - L[i] - 1) / 2])))
        {
            L[i]++;
        }

        if (L[i] > maxLPSLength)
        {
            maxLPSLength = L[i];
            maxLPSCenterPosition = i;
        }

        if (i + L[i] > R)
        {
            C = i;
            R = i + L[i];
        }
    }

    int start = (maxLPSCenterPosition - maxLPSLength) / 2;
    return s.substr(start, maxLPSLength);
}