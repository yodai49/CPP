#include <iostream>
#include <iomanip>
using namespace std;
int main(){
    double comq[5050][5050]; //com[n][k]=nCk
    int n = 25; //(n k)_qのn
    int k = 5; //(n k)_qのk
    double q = 1.2; //(n k)_qのq
    double powq[5050]; //qの累乗
    int p = 1000000007; //nCk modPのP  1000000007=10^9+7
    double result;  
    comq[0][0]  = 1;
    powq[0] = 1;
    for (int i = 1; i <= k; i++){
        powq[i] = powq[i-1] * q;
    }
    for (int i = 1; i <= n;i++){
        comq[i][0] = 1;
        for (int j = 1; j <= k; j++){
            comq[i][j] = (double)(comq[i-1][j-1] + powq[j] * comq[i-1][j]);
        }
    }
    result = comq[n][k];
    cout <<  fixed << setprecision(15) << result << endl;
}