#include <iostream>
#include <string>
#include <vector>
using namespace std;

vector<int> z_algorithm(const string &s, const string &pattern)
{
    string combined = pattern + "$" + s;
    int n = combined.length();
    vector<int> Z(n, 0);
    int left = 0, right = 0;

    for (int i = 1; i < n; i++)
    {
        if (i > right)
        {
            left = right = i;
            while (right < n && combined[right - left] == combined[right])
            {
                right++;
            }
            Z[i] = right - left;
            right--;
        }
        else
        {
            int k = i - left;
            if (Z[k] < right - i + 1)
            {
                Z[i] = Z[k];
            }
            else
            {
                left = i;
                while (right < n && combined[right - left] == combined[right])
                {
                    right++;
                }
                Z[i] = right - left;
                right--;
            }
        }
    }

    vector<int> positions;
    for (int i = pattern.length() + 1; i < n; i++)
    {
        if (Z[i] == pattern.length())
        {
            positions.push_back(i - pattern.length() - 1);
        }
    }

    return positions;
}